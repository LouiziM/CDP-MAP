import { useTheme } from '@emotion/react';
import React from 'react';

const data = {
    kmeans_label: [0, 1, 2, 3],
    type_voiture: [4, 3, 2, 1, 0],
    color_group: [0, 1, 2, 3],
    vn_vo: [0]
};

const HorizontalTables = () => (

    <div style={styles.outerContainer}>
        <div style={styles.tableContainer}>
            <table style={styles.styledTable}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>kmeans_label</th>
                    </tr>
                </thead>
                <tbody>
                    {data.kmeans_label.map((item, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.evenRow : null}>
                            <td style={styles.tableCell}>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table style={styles.styledTable}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>type_voiture</th>
                    </tr>
                </thead>
                <tbody>
                    {data.type_voiture.map((item, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.evenRow : null}>
                            <td style={styles.tableCell}>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table style={styles.styledTable}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>color_group</th>
                    </tr>
                </thead>
                <tbody>
                    {data.color_group.map((item, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.evenRow : null}>
                            <td style={styles.tableCell}>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <table style={styles.styledTable}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>vn_vo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.vn_vo.map((item, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.evenRow : null}>
                            <td style={styles.tableCell}>{item}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const styles = {
    outerContainer: {
        backgroundColor: '#f2f2f2',
        padding: '20px',
        borderRadius: '10px',
    },
    tableContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    styledTable: {
        borderCollapse: 'collapse',
        margin: '10px 0',
        fontSize: '0.9em',
        minWidth: '100px',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    tableHeader: {
        backgroundColor: '#004BAB',
        color: '#ffffff',
        textAlign: 'left',
        padding: '12px 15px',
    },
    tableCell: {
        padding: '6px 15px',
        borderBottom: '1px solid #dddddd',
    },
    evenRow: {
        backgroundColor: '#f3f3f3',
    },
};

export default HorizontalTables;
