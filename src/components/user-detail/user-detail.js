import React from 'react';
import './user-detail.css';

const UserDetail = ({ userProfile, totalReceivedPoint, totalSentPoint, totalClappedPoint }) => (
    <div className="unipos-wrapper">
        <div className="headers">
            <div className="header-avatar">
                <img src={userProfile.member.picture_url} className="involvingMember_picture"/>
            </div>
            <div className="header-profile-detail">
                <div>
                    <div className="default-title">
                        <label>Name</label>
                    </div>
                    <div className="default-label">
                        <label title={userProfile.member.display_name}>{userProfile.member.display_name}</label>
                    </div>
                </div>
                <div>
                    <div className="default-title">
                        <label>E-mail</label>
                    </div>
                    <div className="default-label">
                        <label title={userProfile.member.email_address}>{userProfile.member.email_address}</label>
                    </div>
                </div>
                <div>
                    <div className="default-title">
                        <label>Groups</label>
                    </div>
                    <div className="default-label">
                        <label title={userProfile.groups[0].name}>{userProfile.groups[0].name}</label>
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
