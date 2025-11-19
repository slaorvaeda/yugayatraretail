'use client';

const CompletionCertificateTemplate = ({
  internName,
  internshipTitle,
  startDate,
  endDate,
  internId,
  organisationName = 'Yuga Yatra Retail (OPC) Private Limited',
  issuerName = 'Debashish Kumar',
  issuerTitle = 'Founder & CEO',
  issuerSignature = 'Sincerely yours'
}) => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.border}>
        <header style={styles.header}>
          <div style={styles.headerAccent} />
          <h1 style={styles.title}>CERTIFICATE</h1>
          <p style={styles.subtitle}>OF INTERNSHIP</p>
          <h2 style={styles.organisation}>{organisationName.toUpperCase()}</h2>
          <p style={styles.caption}>THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
          <h3 style={styles.recipient}>{internName}</h3>
        </header>

        <main style={styles.body}>
          <p style={styles.statement}>
            We are happy to certify that <strong>{internName}</strong> has completed the internship as a{' '}
            <strong>{internshipTitle}</strong> from <strong>{startDate}</strong> to <strong>{endDate}</strong>. We
            appreciate their contributions and commitment during the programme.
          </p>
        </main>

        <footer style={styles.footer}>
          <div style={styles.signatureBlock}>
            <p style={styles.signatureLabel}>{issuerSignature}</p>
            <p style={styles.signatureName}>{issuerName}</p>
            <p style={styles.signatureTitle}>{issuerTitle}</p>
          </div>
          <div style={styles.emblem}>
            <div style={styles.emblemInner} />
          </div>
          <div style={styles.idBlock}>
            <p style={styles.idLabel}>Intern ID</p>
            <p style={styles.idValue}>{internId}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: '950px',
    margin: '0 auto',
    padding: '32px',
    backgroundColor: '#0f2547',
    borderRadius: '24px'
  },
  border: {
    position: 'relative',
    backgroundColor: '#ffffff',
    padding: '64px 72px',
    borderRadius: '18px',
    border: '8px solid #f5a623',
    boxShadow: '0 30px 60px rgba(15, 37, 71, 0.25)',
    fontFamily: "'Playfair Display', 'Times New Roman', serif",
    color: '#152650'
  },
  header: {
    textAlign: 'center'
  },
  headerAccent: {
    width: '120px',
    height: '6px',
    backgroundColor: '#f5a623',
    margin: '0 auto 24px',
    borderRadius: '999px'
  },
  title: {
    margin: 0,
    fontSize: '48px',
    letterSpacing: '0.18em'
  },
  subtitle: {
    marginTop: '8px',
    fontSize: '18px',
    letterSpacing: '0.4em'
  },
  organisation: {
    marginTop: '32px',
    fontSize: '24px',
    letterSpacing: '0.15em'
  },
  caption: {
    marginTop: '24px',
    fontSize: '14px',
    letterSpacing: '0.35em'
  },
  recipient: {
    marginTop: '28px',
    marginBottom: '28px',
    fontSize: '40px',
    fontWeight: 600,
    letterSpacing: '0.08em'
  },
  body: {
    marginTop: '36px',
    fontFamily: "'Libre Baskerville', Georgia, serif",
    fontSize: '18px',
    lineHeight: 1.6,
    textAlign: 'center',
    color: '#2d3a58'
  },
  statement: {
    margin: 0
  },
  footer: {
    marginTop: '64px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    alignItems: 'center',
    gap: '20px'
  },
  signatureBlock: {
    textAlign: 'left'
  },
  signatureLabel: {
    margin: 0,
    fontFamily: "'Dancing Script', cursive",
    fontSize: '24px',
    color: '#f5a623'
  },
  signatureName: {
    margin: '12px 0 4px',
    fontWeight: 600,
    letterSpacing: '0.18em',
    fontSize: '16px',
    textTransform: 'uppercase'
  },
  signatureTitle: {
    margin: 0,
    fontSize: '12px',
    letterSpacing: '0.35em',
    textTransform: 'uppercase'
  },
  emblem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emblemInner: {
    width: '96px',
    height: '96px',
    borderRadius: '50%',
    border: '6px solid #f5a623',
    background: 'radial-gradient(circle at center, #f5a623 0%, #f5a623 40%, #152650 100%)',
    boxShadow: '0 10px 20px rgba(15, 37, 71, 0.25)'
  },
  idBlock: {
    textAlign: 'right'
  },
  idLabel: {
    margin: 0,
    fontSize: '12px',
    letterSpacing: '0.35em',
    textTransform: 'uppercase'
  },
  idValue: {
    marginTop: '8px',
    fontSize: '20px',
    fontWeight: 600,
    letterSpacing: '0.12em'
  }
};

export default CompletionCertificateTemplate;



