import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../utils/notify';
import { Layout } from '../../layouts/modal';

import styled from '@emotion/styled';

const StyledModalContainer = styled.div`
  z-index: 1;
  margin-top: 3em;
  margin-bottom: 3em;
  padding: 1.5em 3em;
  padding-bottom: 3em;
  background: #fff;
  color: rgba(14, 30, 37, 0.54);
  border-radius: 8px;
  box-shadow: 0 1px 6px 0 rgba(14, 30, 37, 0.12);
  position: relative;
`;

const StyledModalClose = styled.div`
  position: absolute;
  right: 20px;
  top: 15px;
  font-size: 16px;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    top: 15px;
    right: 20px;
    font-size: 18px;
  }
`;

const StyledModalBody = styled.div`
  margin-top: 20px;
`;

const StyledDangerButton = styled.button`
  background-color: #fb6d77;
  border-color: #fb6d77;
  border-bottom-color: #e6636b;
  color: #fff;
  &:focus,
  &:hover {
    background-color: #fa3b49;
    border-color: #fa3b49;
    color: #fff;
  }
`;

const SettingsMenu = ({ showMenu, handleModalClose, handleClearCompleted }) => {
  const isVisible = showMenu ? true : false;
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
      <AnimatePresence>
        {isVisible && (
          <Layout>
            <StyledModalContainer>
              <h2>Settings</h2>
              <StyledModalClose
                onClick={handleModalClose}
                role="img"
                aria-label="close"
              >
                ❌
              </StyledModalClose>
              <StyledModalBody onClick={handleDelete}>
                <StyledDangerButton>
                  {'Clear All Completed Todos'}
                </StyledDangerButton>
              </StyledModalBody>
            </StyledModalContainer>
          </Layout>
        )}
      </AnimatePresence>
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
