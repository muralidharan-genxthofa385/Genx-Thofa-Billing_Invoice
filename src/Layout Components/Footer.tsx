import React from 'react';

function Footer() {
  return (
    <div className="container-fluid border-top py-2" style={{ backgroundColor: 'var(--whitebg)', borderTop: '1.5px solid var(--color-border)' }}>
      <div className="row align-items-center text-center text-md-start px-3">
        <div className="col-12 col-md-6 mb-2 mb-md-0">
          <span style={{ fontSize: '14px', color: 'var(--color-warning-tex)' }}>
            © Genx Thofa Technologies. All Rights Reserved.
          </span>
        </div>
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
          <label style={{ fontSize: '14px', color: 'var(--color-warning-tex)' }}>
            <span className="me-2">Privacy Policy</span> | <span className="ms-2">Terms of Use</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Footer;
