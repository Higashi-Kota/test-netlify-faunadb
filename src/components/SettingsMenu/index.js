import React, { Component } from 'react';
import styles from './SettingsMenu.css'; // eslint-disable-line

import { ToastContainer } from 'react-toastify';
import { notify } from '../../utils/notify';

const SettingsMenu = ({ showMenu, handleModalClose, handleClearCompleted }) => {
  const showOrHide = showMenu ? 'flex' : 'none';
  const handleDelete = async (e) => {
    const deleteConfirm = window.confirm(
      'Are you sure you want to clear all completed todos?'
    );
    if (deleteConfirm) {
      const resultMessage = await handleClearCompleted();
      notify({ message: `${resultMessage}` });
    }
  };
  return (
    <>
      <div className="settings-wrapper" style={{ display: showOrHide }}>
        <div className="settings-content">
          <span
            className="settings-close"
            onClick={handleModalClose}
            role="img"
            aria-label="close"
          >
            ❌
          </span>
          <h2>Settings</h2>
          <div className="settings-section" onClick={handleDelete}>
            <button className="btn-danger">Clear All Completed Todos</button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export { SettingsMenu };
