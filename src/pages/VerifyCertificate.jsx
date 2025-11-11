import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

//
// !!! IMPORTANT !!!
// 1. Paste your published Google Sheet CSV URL here
//
const googleSheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSkAmS7Myj3NHDfuITysFfAi53uKqVbQpltC7ORD1noF9R7ufl05WaONqmbueNeLi2U4Wx2NXU3M9oV/pub?gid=0&single=true&output=csv';

// Simple styling
const styles = {
    container: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        padding: '2rem 1rem',
    },
    box: {
        background: 'var(--card-bg, #fff)', // Use CSS var for theme support
        color: 'var(--text-color, #212529)', // Use CSS var for theme support
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
        border: '1px solid var(--border-color, #e0e0e0)', // Use CSS var
        maxWidth: '500px',
        width: '90%',
    },
    header: {
        color: 'inherit', // Inherit color
        borderBottom: '2px solid var(--border-color, #eee)', // Use CSS var
        paddingBottom: '15px',
        marginBottom: '25px',
    },
    status: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
    },
    verified: { fontSize: '1.5rem', color: '#28a745', marginBottom: '10px' },
    invalid: { fontSize: '1.5rem', color: '#dc3545', marginBottom: '10px' },
    dataLabel: { fontWeight: 600 },
};

function VerifyCertificate() {
    const [searchParams] = useSearchParams();
    const [statusMessage, setStatusMessage] = useState(<p>Loading and verifying...</p>);
    const certId = searchParams.get('id');

    // Dynamically set CSS variables based on theme (optional but nice)
    useEffect(() => {
      const root = document.documentElement;
      const theme = root.style.getPropertyValue('color-scheme');
      const box = document.querySelector('[style*="--card-bg"]'); // Find our box
      if (box) {
        if (theme === 'dark') {
          box.style.setProperty('--card-bg', '#2a314e');
          box.style.setProperty('--text-color', '#e9ecef');
          box.style.setProperty('--border-color', '#40486a');
        } else {
          box.style.setProperty('--card-bg', '#ffffff');
          box.style.setProperty('--text-color', '#212529');
          box.style.setProperty('--border-color', '#dee2e6');
        }
      }
    }, []);

    useEffect(() => {
        if (!certId) {
            setStatusMessage(
                <>
                    <h3 style={styles.invalid}>❌ Error</h3>
                    <p>No certificate ID provided.</p>
                </>
            );
            return;
        }

        fetch(googleSheetURL)
            .then(response => {
                if (!response.ok) throw new Error('Network error');
                return response.text();
            })
            .then(csvText => {
                const rows = csvText.split(/\r?\n/);
                const headers = rows[0].split(',').map(h => h.trim());
                const idColumnIndex = headers.indexOf('UniqueID');

                if (idColumnIndex === -1) {
                    setStatusMessage(
                        <>
                            <h3 style={styles.invalid}>❌ Configuration Error</h3>
                            <p>Could not find 'UniqueID' column in the data sheet.</p>
                        </>
                    );
                    return;
                }

                let found = false;
                for (let i = 1; i < rows.length; i++) {
                    const rowData = rows[i].split(',');
                    if (rowData[idColumnIndex] && rowData[idColumnIndex].trim() === certId.trim()) {
                        const name = rowData[headers.indexOf('Name')];
                        const role = rowData[headers.indexOf('Role')];
                        const endDate = rowData[headers.indexOf('EndDate')];

                        setStatusMessage(
                            <>
                                <h3 style={styles.verified}>✅ Verified</h3>
                                <p>This certificate was successfully awarded to:</p>
                                <h4 style={{ fontSize: '1.8rem', margin: '15px 0' }}>{name}</h4>
                                <p><span style={styles.dataLabel}>Role:</span> {role}</p>
                                <p><span style={styles.dataLabel}>Completion Date:</span> {endDate}</p>
                            </>
                        );
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    setStatusMessage(
                        <>
                            <h3 style={styles.invalid}>❌ Invalid ID</h3>
                            <p>Certificate ID <strong>{certId}</strong> was not found in our records.</p>
                        </>
                    );
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                setStatusMessage(
                    <>
                        <h3 style={styles.invalid}>❌ Error</h3>
                        <p>Could not connect to the verification service.</p>
                    </>
                );
            });

    }, [certId]); // Rerun effect if certId changes

    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2 style={styles.header}>Kodhive Certificate Verification</h2>
                <div style={styles.status}>
                    {statusMessage}
                </div>
            </div>
        </div>
    );
}

export default VerifyCertificate;