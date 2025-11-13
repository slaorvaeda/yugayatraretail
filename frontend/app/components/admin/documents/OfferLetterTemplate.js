'use client';


function OfferLetterTemplate({
  candidateName,
  candidateEmail,
  issueDate,
  startDate,
  endDate,
  role = 'Software Engineer Intern',
  companyName = 'Yuga Yatra Retail (OPC) Pvt. Ltd.',
  companyEmail = 'yugayatra@gmail.com',
  companyPhone = '+91 875 772 8679',
  companyWebsite = 'www.yugayatraretail.com',
  addressLine = 'Yuga Yatra Retail (OPC) Private Limited'
}) {
  const uppercaseName = (candidateName || '').toUpperCase();

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={{ ...styles.ribbonTriangle, left: 0, top: 0, backgroundColor: '#d43239' }} />
        <div style={{ ...styles.ribbonTriangle, left: 80, top: 0, backgroundColor: '#ffd24c' }} />
        <div style={{ ...styles.ribbonTriangle, right: 0, top: 0, backgroundColor: '#d43239', transform: 'scaleX(-1)' }} />
        <div
          style={{
            ...styles.ribbonTriangle,
            right: 64,
            top: 0,
            height: 130,
            backgroundColor: '#ffd24c',
            transform: 'scaleX(-1)'
          }}
        />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16, backgroundColor: '#ffd24c' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 16, height: 18, backgroundColor: '#d43239' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <header>
          <div style={styles.headerBar}>
            <div style={styles.headerLeft}>
              <div style={styles.logoWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/favicon.png"
                  alt="Yuga Yatra logo"
                  style={{ width: 'auto', height: '100%', borderRadius: '9999px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <p style={styles.headerTagline}>Yuga Yatra Retail</p>
                <h1 style={styles.headerTitle}>(OPC) Pvt. Ltd.</h1>
              </div>
            </div>
            <div style={styles.headerRight}>
              <span>#startupindia</span>
              <span>Digital India</span>
            </div>
            <div style={styles.headerUnderline} />
          </div>

          <div style={styles.plaqueWrapper}>
            <div style={styles.titlePlaque}>
              <span style={styles.plaqueBadge}>Official Document</span>
              <h2 style={styles.plaqueTitle}>Internship Offer Letter</h2>
            </div>
          </div>
        </header>

        <main style={styles.main}>
          <section style={styles.letterCard}>
            <div style={styles.cardWatermark}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon.png"
                alt="Watermark"
                style={{ width: 270, height: 270, objectFit: 'contain', opacity: 0.28, mixBlendMode: 'multiply' }}
              />
            </div>

            <div style={styles.addressBlock}>
              <p>Date: {issueDate}</p>
              <p style={{ marginTop: 8 }}>To</p>
              <p style={{ marginTop: 2, fontWeight: 700, letterSpacing: '0.18em' }}>{uppercaseName}</p>
              <p style={{ color: '#455a89' }}>{candidateEmail}</p>
            </div>

            <div style={styles.bodyCopy}>
              <p>Dear {uppercaseName},</p>
              <p>
                We are pleased to offer you an Internship opportunity at <strong>{companyName}</strong> as a{' '}
                <strong>{role}</strong> for the period from <strong>{startDate}</strong>, to <strong>{endDate}</strong>.
              </p>
              <p style={{ lineHeight: 1.35 }}>During this internship, you will gain hands-on experience in the following areas:</p>
              <div style={styles.bulletList}>
                <p>• Developing an website / App Using Cursor AI , Firebase Studio, AI Technologies</p>
                <p>• Designing using Canva .</p>
                <p>• Doing real time projects Freelancing on www.upwork.com</p>
                <p>• Working on seller portal on amazon.com, flipkart.com .</p>
                <p>• Collaborating with team members using Google Workspace</p>
              </div>
              <p style={{ lineHeight: 1.35 }}>
                You will work closely with our team and contribute to live projects, gaining real-world experience in web
                development and digital content creation. This internship is designed to help you grow your technical skills and
                understand industry practices.
              </p>
              <p>
                <strong>Stipend Information:</strong> Stipend will be provided during the internship.
              </p>
              <p>
                50% of the project value subject to successfully completed and paid projects on www.upwork.com, based on your
                performance and contribution .
              </p>
              <p>
                <strong>Duration:</strong> 2 months (Sept 29th 2025 – Nov 29th, 2025)
              </p>
              <p>
                Upon successful completion of the internship, you will receive a <strong>Certificate of Internship</strong> from{' '}
                {companyName}.
              </p>
              <p>We are excited to have you on board and look forward to your contributions to our team.</p>
            </div>

            <div style={styles.signatureBlock}>
              <p>Warm regards,</p>
              <div style={{ marginTop: 12, fontWeight: 600 }}>
                <p>Mr. Debashish Kumar</p>
                <p>CEO / Director</p>
                <p>{addressLine}</p>
              </div>
            </div>

            <div style={styles.badgeColumn}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/startupindia.png" alt="Startup India" style={styles.badgeImage} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/makeinindia.png" alt="Make in India" style={styles.badgeImage} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/msme.png" alt="MSME" style={styles.badgeImage} />
            </div>
          </section>
        </main>

        <footer style={styles.footer}>
          <div style={{ ...styles.footerAccent, right: 0, bottom: 0 }} />
          <div style={{ ...styles.footerCircle, left: -80 }} />
          <div style={{ ...styles.footerCircle, right: -70, transform: 'rotate(-18deg)' }} />

          <div style={styles.footerGrid}>
            <div>
              <p style={styles.footerHeading}>Phone</p>
              <p>{companyPhone}</p>
            </div>
            <div>
              <p style={styles.footerHeading}>Email</p>
              <p>{companyEmail}</p>
            </div>
            <div>
              <p style={styles.footerHeading}>Website</p>
              <p>{companyWebsite}</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    margin: '0 auto',
    maxWidth: '1100px',
    minHeight: '800px',
    borderRadius: '18px',
    border: '3px solid rgba(20, 41, 85, 0.25)',
    background: '#ffffff',
    overflow: 'hidden',
    boxShadow: '0 18px 32px rgba(19, 41, 85, 0.14)',
    fontFamily: 'Helvetica, Arial, sans-serif',
    color: '#1b2f55'
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none'
  },
  ribbonTriangle: {
    position: 'absolute',
    width: 220,
    height: 150,
    clipPath: 'polygon(0 0, 100% 0, 0 100%)'
  },
  headerBar: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#132c5a',
    padding: '36px 36px 18px',
    color: '#ffffff'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  logoWrapper: {
    width: '96px',
    height: '96px',
    borderRadius: '9999px',
    background: '#ffffff',
    border: '6px solid #ffffff',
    padding: '14px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTagline: {
    fontSize: '10px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.34em',
    color: '#ffd24c',
    margin: 0
  },
  headerTitle: {
    fontSize: '22px',
    fontWeight: 900,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    margin: '6px 0 0'
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '6px',
    fontSize: '9px',
    textTransform: 'uppercase',
    letterSpacing: '0.32em',
    color: '#ffd24c'
  },
  headerUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '12px',
    background: '#ffd24c'
  },
  plaqueWrapper: {
    marginTop: -24,
    paddingInline: 36
  },
  titlePlaque: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    border: '1px solid #d0d6eb',
    background: '#ffffff',
    padding: '12px 32px',
    boxShadow: '0 14px 30px rgba(0,0,0,0.08)'
  },
  plaqueBadge: {
    fontSize: '9px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.42em',
    color: '#d43239'
  },
  plaqueTitle: {
    margin: '10px 0 0',
    fontSize: '19px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.42em',
    color: '#132c5a'
  },
  main: {
    position: 'relative',
    zIndex: 1,
    padding: '24px 40px 36px'
  },
  letterCard: {
    position: 'relative',
    borderRadius: '14px',
    border: '1px solid #d7deef',
    background: '#ffffff',
    padding: '24px 36px 72px',
    fontSize: '13px',
    lineHeight: 1.6,
    boxShadow: '0 12px 28px rgba(17,31,73,0.08)',
    color: '#2a3f6c'
  },
  cardWatermark: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none'
  },
  addressBlock: {
    position: 'relative',
    zIndex: 1,
    fontSize: '12px',
    fontWeight: 600,
    color: '#1b2f55'
  },
  bodyCopy: {
    position: 'relative',
    zIndex: 1,
    marginTop: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    color: '#2a3f6c'
  },
  bulletList: {
    paddingLeft: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontWeight: 500,
    lineHeight: 1.4
  },
  signatureBlock: {
    position: 'relative',
    zIndex: 1,
    marginTop: '28px',
    color: '#2a3f6c'
  },
  badgeColumn: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '10px'
  },
  badgeImage: {
    height: '30px',
    width: 'auto',
    objectFit: 'contain',
    boxShadow: '0 3px 8px rgba(0,0,0,0.25)'
  },
  footer: {
    position: 'relative',
    overflow: 'hidden',
    background: '#11254d',
    color: '#ffffff',
    padding: '22px 40px 30px'
  },
  footerAccent: {
    position: 'absolute',
    pointerEvents: 'none',
    width: '240px',
    height: '220px',
    background: '#0b1738',
    clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
    opacity: 0.4
  },
  footerCircle: {
    position: 'absolute',
    bottom: -120,
    width: '220px',
    height: '220px',
    borderRadius: '50%',
    border: '14px solid rgba(255,210,76,0.55)',
    pointerEvents: 'none',
    transform: 'rotate(18deg)',
    opacity: 0.5
  },
  footerGrid: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '16px',
    fontSize: '12px'
  },
  footerHeading: {
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.4em',
    color: '#ffd24c'
  }
};

export default OfferLetterTemplate;


