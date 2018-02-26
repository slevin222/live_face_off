import React, { Component } from 'react';

class Leaderboard extends Component {

    render(){
        const list = this.props.data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.rank}</td>
                    <td>{item.teamName}</td>
                    <td>{item.gameType}</td>
                    <td>{item.wins}</td>
                </tr>
            )
        });

        return (
            <div className='row'>
                <div className='col s8 offset-s2'>
                    <h5 className='center-align'>Top 10 Leaderboard</h5>
                    <table className='highlight bordered centered'>
                        <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team Name</th>
                            <th>Game Type</th>
                            <th>Wins</th>
                        </tr>
                        </thead>
                        <tbody>
                        {list}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Leaderboard;