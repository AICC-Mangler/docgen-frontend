import React, { useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';
import * as XLSX from 'xlsx';
import 'handsontable/dist/handsontable.full.css';
const RequirementDocumentViewer: React.FC = () => {
  const [data, setData] = useState<any[][]>([]);
  const [mergeCells, setMergeCells] = useState<any[]>([]);
  useEffect(() => {
    const fetchExcel = async () => {
      const res = await fetch(
        'http://localhost:3100/document/requirement/file/68b007e231b920ebbad0910b',
      );
      const blob = await res.blob();
      const arrayBuffer = await blob.arrayBuffer();

      const workbook = XLSX.read(arrayBuffer);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const merges = (worksheet['!merges'] || []).map((m) => ({
        row: m.s.r,
        col: m.s.c,
        rowspan: m.e.r - m.s.r + 1,
        colspan: m.e.c - m.s.c + 1,
      }));

      setData(jsonData);
      setMergeCells(merges);
    };

    fetchExcel();
  }, []);

  return (
    <div>
      <HotTable
        data={data}
        colHeaders={true}
        rowHeaders={true}
        width="100%"
        height="600"
        licenseKey="non-commercial-and-evaluation"
        mergeCells={mergeCells} // <- mergeCells prop에 전달
        manualColumnResize={true}
        manualRowResize={true}
        readOnly={true} // 읽기 전용
      />
    </div>
  );
};

export default RequirementDocumentViewer;
