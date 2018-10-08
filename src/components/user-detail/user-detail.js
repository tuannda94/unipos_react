import React, { Component } from 'react';
import './user-detail.css';

const UserDetail  = ({user_avatar, userName, email, groupName, totalReceivedPoint, totalSentPoint, totalClappedPoint}) => (
    <div className="unipos-wrapper">
        <div className="headers">
            <div className="header-avatar">
                <img src={user_avatar} className="involvingMember_picture"/>
            </div>
            <div className="header-profile-detail">
                <div>
                    <div className="default-title">
                        <label>Name</label>
                    </div>
                    <div className="default-label">
                        <label>{userName}</label>
                    </div>
                </div>
                <div>
                    <div className="default-title">
                        <label>E-mail</label>
                    </div>
                    <div className="default-label">
                        <label>{email}</label>
                    </div>
                </div>
                <div>
                    <div className="default-title">
                        <label>Groups</label>
                    </div>
                    <div className="default-label">
                        <label>{groupName}</label>
                    </div>
                </div>
            </div>
        </div>
        <table className="box">
            <tbody>
                <tr className="partial">
                    <td className="tbox-left">Point Received</td>
                    <td className="tbox-right">{totalReceivedPoint}</td>
                </tr>
                <tr className="partial">
                    <td className="tbox-left">Point Sent</td>
                    <td className="tbox-right">{totalSentPoint}</td>
                </tr>
                <tr className="partial">
                    <td className="tbox-left">Post Clapped</td>
                    <td className="tbox-right">{totalClappedPoint}</td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default UserDetail;
