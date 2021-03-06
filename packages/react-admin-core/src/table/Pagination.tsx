import { Grid, Toolbar, Typography } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import * as React from "react";
import * as sc from "./Pagination.sc";
import { IPagingActions } from "./pagingStrategy/PagingStrategy";
import { TableQueryContext } from "./TableQueryContext";

interface IProps {
    totalCount: number;
    pagingActions: IPagingActions;
    rowName?: string | ((count: number) => string);
}

export const TablePagination: React.FunctionComponent<IProps> = ({ totalCount, pagingActions, rowName }) => {
    const tableQueryContext = React.useContext(TableQueryContext);
    if (typeof rowName === "function") {
        rowName = rowName(totalCount);
    }
    return (
        <TableCell colSpan={1000}>
            <Toolbar>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                        <Typography color="textPrimary" variant="body2">
                            {totalCount} {rowName}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <sc.Button
                            onClick={() => {
                                if (tableQueryContext) pagingActions.fetchPreviousPage!(tableQueryContext.api);
                            }}
                            disabled={!pagingActions.fetchPreviousPage}
                        >
                            <KeyboardArrowLeft color={pagingActions.fetchPreviousPage ? "inherit" : "disabled"} />
                        </sc.Button>
                        <sc.Button
                            onClick={() => {
                                if (tableQueryContext) pagingActions.fetchNextPage!(tableQueryContext.api);
                            }}
                            disabled={!pagingActions.fetchNextPage}
                        >
                            <KeyboardArrowRight color={pagingActions.fetchNextPage ? "inherit" : "disabled"} />
                        </sc.Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </TableCell>
    );
};
