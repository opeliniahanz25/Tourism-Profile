export const EmptyRow = ({ colSpan, message }: { colSpan: number, message: string }) => (
  <tr>
    <td colSpan={colSpan} className="p-10 text-center text-gray-400 italic text-xs bg-white border border-gray-100 uppercase font-bold tracking-tight">
      {message}
    </td>
  </tr>
);