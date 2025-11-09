import { utils, write } from 'xlsx';

export const exportTransactions = (transactions, format = 'csv') => {
    const data = transactions.map(tx => ({
        Date: tx.date,
        Type: tx.type.charAt(0).toUpperCase() + tx.type.slice(1),
        Amount: tx.amount,
        Value: tx.value,
        Status: tx.status,
        'From/To': tx.from || tx.to,
        Hash: tx.hash,
        Network: tx.network || 'Ethereum'
    }));

    if (format === 'csv') {
        return exportToCSV(data);
    } else if (format === 'excel') {
        return exportToExcel(data);
    } else if (format === 'pdf') {
        return exportToPDF(data);
    }
};

const exportToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
};

const exportToExcel = (data) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Transactions');
    writeFile(workbook, `transactions-${new Date().toISOString().split('T')[0]}.xlsx`);
};

const exportToPDF = (data) => {
    // Simple PDF export implementation
    const content = {
        content: [
            { text: 'Transaction History', style: 'header' },
            {
                table: {
                    headerRows: 1,
                    widths: ['*', '*', '*', '*', '*', '*'],
                    body: [
                        ['Date', 'Type', 'Amount', 'Value', 'Status', 'Hash'],
                        ...data.map(tx => [
                            tx.Date,
                            tx.Type,
                            tx.Amount,
                            tx.Value,
                            tx.Status,
                            tx.Hash.slice(0, 10) + '...'
                        ])
                    ]
                }
            }
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            }
        }
    };

    // In a real implementation, you would use a PDF library like pdfmake
    console.log('PDF Export:', content);
    alert('PDF export would be generated here with a proper PDF library');
};

export const generateTaxReport = (transactions, year) => {
    const yearTransactions = transactions.filter(tx =>
        new Date(tx.date).getFullYear() === year
    );

    const summary = {
        totalReceived: 0,
        totalSent: 0,
        tradingGains: 0,
        feesPaid: 0,
        transactions: yearTransactions.length
    };

    yearTransactions.forEach(tx => {
        if (tx.type === 'received') {
            summary.totalReceived += parseFloat(tx.value.replace('$', '').replace(',', ''));
        } else if (tx.type === 'sent') {
            summary.totalSent += parseFloat(tx.value.replace('$', '').replace(',', ''));
        }
    });

    return summary;
};