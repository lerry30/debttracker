export const DEBTSSEEDS = [
    {
        id: '1', // Unique identifier
        borrower_name: 'Pedro', // Name of the person who owes the debt
        total_amount: 10000, // Total debt amount
        remaining_balance: 9800, // Remaining balance after payments
        transaction_summary_id: '1', // Reference to transaction summary
        date: 'Aug. 30, 2023' // Date of the transaction or record
    },
    {
        id: '2', // Unique identifier
        borrower_name: 'Juan', // Name of the person who owes the debt
        total_amount: 120000, // Total debt amount
        remaining_balance: 0, // Remaining balance after payments
        transaction_summary_id: '2', // Reference to transaction summary
        date: 'Nov. 30, 2023' // Date of the transaction or record
    },
    {
        id: '3', // Unique identifier
        borrower_name: 'Alehandro', // Name of the person who owes the debt
        total_amount: 100000, // Total debt amount
        remaining_balance: 50000, // Remaining balance after payments
        transaction_summary_id: '3', // Reference to transaction summary
        date: 'Jan. 1, 2023' // Date of the transaction or record
    },
    {
        id: '4', // Unique identifier
        borrower_name: 'Ben', // Name of the person who owes the debt
        total_amount: 50300, // Total debt amount
        remaining_balance: 47300, // Remaining balance after payments
        transaction_summary_id: '4', // Reference to transaction summary
        date: 'Jan. 30, 2023' // Date of the transaction or record
    },
    {
        id: '5', // Unique identifier
        borrower_name: 'Jualian', // Name of the person who owes the debt
        total_amount: 80000, // Total debt amount
        remaining_balance: 80000, // Remaining balance after payments
        transaction_summary_id: '5', // Reference to transaction summary
        date: 'Mar. 4, 2023' // Date of the transaction or record
    },
    {
        id: '6', // Unique identifier
        borrower_name: 'Laila', // Name of the person who owes the debt
        total_amount: 73000, // Total debt amount
        remaining_balance: 73000, // Remaining balance after payments
        transaction_summary_id: '6', // Reference to transaction summary
        date: 'Jul. 2, 2023' // Date of the transaction or record
    },
    {
        id: '7', // Unique identifier
        borrower_name: 'Anne', // Name of the person who owes the debt
        total_amount: 90000, // Total debt amount
        remaining_balance: 90000, // Remaining balance after payments
        transaction_summary_id: '7', // Reference to transaction summary
        date: 'Dec. 8, 2022' // Date of the transaction or record
    },
];

export const TRANSACTIONSSEEDS = {
    '1': [
        {
            id: '1',
            payment: 100,
            date: 'Aug. 12, 2024 1:30 PM',
        },
        {
            id: '2',
            payment: 100,
            date: 'Aug. 12, 2024 3:30 PM',
        }
    ],
    '2': [
        {
            id: '1',
            payment: 100000,
            date: 'Jul. 12, 2024 10:30 PM',
        },
        {
            id: '2',
            payment: 20000,
            date: 'Aug. 1, 2024 1:00 PM',
        }
    ],
    '3': [
        {
            id: '1',
            payment: 10000,
            date: 'Jan. 11, 2024 2:30 PM',
        },
        {
            id: '2',
            payment: 10000,
            date: 'Feb. 11, 2024 9:30 PM',
        },
        {
            id: '3',
            payment: 10000,
            date: 'Mar. 11, 2024 3:30 PM',
        },
        {
            id: '4',
            payment: 10000,
            date: 'Apr. 11, 2024 10:30 AM',
        },
        {
            id: '5',
            payment: 10000,
            date: 'May. 11, 2024 8:30 AM',
        },
    ],
    '4': [
        {
            id: '1',
            payment: 1000,
            date: 'Jul. 12, 2024 9:30 AM',
        },
        {
            id: '2',
            payment: 2000,
            date: 'Aug. 3, 2024 9:00 AM',
        }
    ],
};
