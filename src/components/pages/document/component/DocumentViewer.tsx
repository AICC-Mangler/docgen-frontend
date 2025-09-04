import React, { useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import { api } from '../../../../api';
import { API_BASE_URL } from '../../../../api/apiClient';
import { registerAllModules } from 'handsontable/registry';
registerAllModules()
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

interface DocumentViewer_Data {
  display_name : string | undefined;
  document_id: string | undefined;
  document_type: "requirement" | "functional" | "policy"
  cell_settings : (row:number, col:number)=>Handsontable.CellMeta
}

const DocumentViewer: React.FC<DocumentViewer_Data> = ({
  display_name,
  document_id,
  document_type,
  cell_settings
}: DocumentViewer_Data) => {
  const [tableData, setTableData] = useState<TableData>({
    data: [],
    mergeCells: [],
    colHeader: [],
  });
  const document_url = `/document/${document_type}/file/${document_id}`;
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
    <div className='flex flex-col gap-3'>
      <div className='flex justify-between'>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{display_name}</h1>
        <button
          className="bg-green-600 text-white shadow-md"
          onClick={download_btn}
        >
          download
        </button>
      </div>
      <div className="overflow-y-scroll h-[600px] border border-black">
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
          rowHeights={40}
          cells={cell_settings}
          className="htMiddle font-bold"
        />
      </div>
    </div>
  );
};

export default DocumentViewer;
