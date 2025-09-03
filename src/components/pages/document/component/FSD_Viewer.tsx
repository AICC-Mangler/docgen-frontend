import React, { useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
import { api } from '../../../../api';
import { API_BASE_URL } from '../../../../api/apiClient';
import 'handsontable/dist/handsontable.full.min.css';
interface MergeCell {
  row: number;
  col: number;
  rowspan: number;
  colspan: number;
}
interface TableData {
  data: (string | number | null)[][];
  mergeCells: MergeCell[];
  colHeader: string[];
}

interface FSD_Viewer_Data {
  document_id: string | undefined;
}

const FSD_Viewer: React.FC<FSD_Viewer_Data> = ({
  document_id,
}: FSD_Viewer_Data) => {
  const [tableData, setTableData] = useState<TableData>({
    data: [],
    mergeCells: [],
    colHeader: [],
  });
  const document_url = `/document/functional/file/${document_id}`;
  useEffect(() => {
    const fetchExcel = async () => {
      const response = await api.get(document_url, {
        responseType: 'arraybuffer',
      });

      const data = new Uint8Array(response.data);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData: any = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const merges = (worksheet['!merges'] || [])
        .map((m) => {
          return {
            row: m.s.r - 1, // row 시작 좌표 보정
            col: m.s.c,
            rowspan: m.e.r - m.s.r + 1,
            colspan: m.e.c - m.s.c + 1,
          };
        })
        .filter((m) => m.row >= 0);
      setTableData({
        data: jsonData,
        mergeCells: merges,
        colHeader: jsonData[0],
      });
    };

    fetchExcel();
  }, []);

  const download_btn = () => {
    location.href = `${API_BASE_URL}${document_url}`;
  };

  return (
    <div>
      <button
        className="bg-green-600 text-white shadow-md"
        onClick={download_btn}
      >
        download
      </button>
      <div className="overflow-y-scroll h-[600px]">
        <HotTable
          data={tableData.data.slice(1)}
          colHeaders={tableData.colHeader}
          rowHeaders={true}
          width="100%"
          height="auto"
          licenseKey="non-commercial-and-evaluation"
          mergeCells={tableData.mergeCells} // <- mergeCells prop에 전달
          manualColumnResize={true}
          manualRowResize={true}
          readOnly={true} // 읽기 전용
          dropdownMenu={[
            'filter_by_condition',
            'filter_action_bar',
            'filter_by_value',
          ]}
          filters={true}
          rowHeights={40}
          cells={(_row, col) => {
            const cellProperties: Handsontable.CellMeta = {};
            if (col < 3) {
              cellProperties.className = 'htCenter htMiddle font-bold';
            }
            if (col < 2) {
              cellProperties.width = 70;
            }

            return cellProperties;
          }}
          className="htMiddle font-bold"
        />
      </div>
    </div>
  );
};

export default FSD_Viewer;
