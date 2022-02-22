import React, {useMemo} from 'react';
import {useTable, usePagination} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS} from './columns';
import './table.css'

export const PaginationTable = () => {

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable({columns,data}, usePagination);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        prepareRow
    } = tableInstance;

    const {pageIndex} = state;

    return(
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })
                    }
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <div className='paginationSection'>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={() => gotoPage(19)} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </>
    )
}