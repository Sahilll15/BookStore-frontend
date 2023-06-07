import React from 'react'

const Succesmodal = () => {
  return (
    <div className="modal fade" id="success_tic" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="modal-body">
          <div className="head">
            <h3>Lorem ipsum dolor sit amet</h3>
            <h4>Lorem ipsum dolor sit amet</h4>
          </div>
          <h1 style={{ textAlign: "center" }}>
            <div className="checkmark-circle">
              <div className="background"></div>
              <div className="checkmark draw"></div>
            </div>
          </h1>
        </div>
      </div>
    </div>
  </div>
);
};
  

export default Succesmodal;