import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

const PendingDoctorsView = () => {
  const columns = ["Date", "Time", "Patient", "Status", "Actions"];
  return (
    <div className="flex items-center justify-center w-full">
      <Table
        isHeaderSticky
        isStriped
        // bottomContent={
        //   reservations.length > 0 && (
        //     <div className="flex justify-center">
        //       <Pagination
        //         page={page}
        //         pages={pages}
        //         isDisabled={loading}
        //         handleChange={(page) => fetchReservations(page, search)}
        //       />
        //     </div>
        //   )
        // }
        aria-label="Example static collection table"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn align="center" key={column}>
              {column}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          //   loadingState={loadingState}
          //   {...(!loading && reservations.length === 0
          //     ? { emptyContent: <NoResults /> }
          //     : {})}
        >
          <TableRow>
            <TableCell>23</TableCell>
            <TableCell>23</TableCell>
            <TableCell>23</TableCell>
            <TableCell>23</TableCell>
            <TableCell>23</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PendingDoctorsView;
