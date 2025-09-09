import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    // --- Configuration ---
    const recipientNumber = '5511945316116'; // Updated number
    const senderContact = '(62) 99161-9560';
    const pixCode = '00020126950014br.gov.bcb.pix013688afc910-19c6-4790-8134-239dfb2319060233Site 7playconnect.com parcela 2/452040000053039865406250.005802BR5919Mario Igor de Jesus6002NA62070503***63046409';

    const messageToSend = `7 Play Connect, tudo bem?
Segue um lembrete referente ao PIX do desenvolvimento do seu site.

Para pagar, copie o código abaixo e cole no seu aplicativo do banco:
\`\`\`
${pixCode}
\`\`\`

Caso tenha alguma problema, favor entrar em contato no nº ${senderContact}`;

    // --- State ---
    const status = {
        isReady: true,
        message: 'Mensagem pronta para envio.',
    };
    const [copyButtonText, setCopyButtonText] = useState('Copiar PIX');

    // --- Handlers ---
    const handleSendMessage = () => {
        const encodedMessage = encodeURIComponent(messageToSend);
        const whatsappUrl = `https://wa.me/${recipientNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    };
    
    const handleCopyPix = async () => {
        try {
            await navigator.clipboard.writeText(pixCode);
            setCopyButtonText('Copiado!');
            setTimeout(() => setCopyButtonText('Copiar PIX'), 2000);
        } catch (err) {
            console.error('Falha ao copiar o código PIX: ', err);
            setCopyButtonText('Erro');
            setTimeout(() => setCopyButtonText('Copiar PIX'), 2000);
        }
    };
    
    const SendIcon = () => (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
        </svg>
    );

    // --- Styles ---
    const styles: { [key: string]: React.CSSProperties } = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            backgroundColor: 'var(--whatsapp-incoming-bg)',
            boxShadow: 'var(--box-shadow)',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
        },
        header: {
            backgroundColor: 'var(--whatsapp-green-dark)',
            color: 'white',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexShrink: 0,
        },
        headerTitle: {
            margin: '0',
            fontSize: '18px',
            fontWeight: '500',
        },
        chatArea: {
            flexGrow: '1',
            backgroundColor: 'var(--whatsapp-background)',
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
        },
        systemMessage: {
            alignSelf: 'center',
            backgroundColor: 'var(--whatsapp-system-message-bg)',
            padding: '6px 12px',
            borderRadius: 'var(--border-radius)',
            fontSize: '13px',
            fontWeight: '500',
            boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
        },
        messageBubble: {
            alignSelf: 'flex-start',
            backgroundColor: 'var(--whatsapp-incoming-bg)',
            borderRadius: 'var(--border-radius)',
            padding: '8px 12px',
            maxWidth: '80%',
            boxShadow: 'var(--box-shadow)',
        },
        messageText: {
            fontFamily: 'inherit',
            fontSize: '15px',
            margin: '0 0 8px 0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
        },
        pixContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f0f0f0',
            padding: '8px 12px',
            borderRadius: 'var(--border-radius)',
            border: '1px solid #ddd',
            marginBottom: '8px',
        },
        pixCode: {
            fontFamily: 'monospace',
            fontSize: '12px',
            overflowX: 'auto',
            wordBreak: 'break-all',
            marginRight: '12px',
            flexGrow: 1,
        },
        copyButton: {
            backgroundColor: 'var(--whatsapp-green-light)',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
            borderRadius: '16px',
            flexShrink: 0,
            transition: 'background-color 0.2s',
        },
        footer: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px 16px',
            backgroundColor: 'var(--whatsapp-background)',
            borderTop: '1px solid var(--whatsapp-border)',
        },
        fakeInput: {
            flexGrow: '1',
            backgroundColor: 'var(--whatsapp-incoming-bg)',
            borderRadius: '20px',
            padding: '8px 16px',
            color: 'var(--whatsapp-text-secondary)',
        },
        sendButton: {
            backgroundColor: status.isReady ? 'var(--whatsapp-green-light)' : 'var(--disabled-color)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: status.isReady ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s, transform 0.1s',
            marginLeft: '8px',
            boxShadow: 'var(--box-shadow)',
        },
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Lembrete de Pagamento</h1>
            </header>

            <main style={styles.chatArea}>
                <div style={styles.systemMessage} aria-live="polite">
                    {status.message}
                </div>
                
                <div style={styles.messageBubble}>
                    <p style={styles.messageText}>
                        7 Play Connect, tudo bem?
                        <br />
                        Segue um lembrete referente ao PIX do desenvolvimento do seu site, segue abaixo o PIX:
                    </p>
                    <div style={styles.pixContainer}>
                        <code style={styles.pixCode}>{pixCode}</code>
                        <button style={styles.copyButton} onClick={handleCopyPix}>
                            {copyButtonText}
                        </button>
                    </div>
                    <p style={styles.messageText}>
                        Caso tenha alguma problema, favor entrar em contato no nº {senderContact}
                    </p>
                </div>
            </main>

            <footer style={styles.footer}>
                <div style={styles.fakeInput}>
                    <span>Mensagem pronta para envio</span>
                </div>
                <button
                    style={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={!status.isReady}
                    aria-label={status.isReady ? "Enviar Lembrete via WhatsApp" : "Aguardando data para enviar"}
                    aria-disabled={!status.isReady}
                >
                    <SendIcon />
                </button>
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);