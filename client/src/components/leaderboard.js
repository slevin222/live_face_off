import React, { Component } from 'react';

class Leaderboard extends Component {

    render() {
        const list = this.props.data.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.rank}</td>
                    <td>{item.name}</td>
                    <td>{item.gameType}</td>
                    <td>{item.score}</td>
                </tr>
            )
        });

        return (
            <div className='row z-depth-5 leaderBoard contentBorder'>
                <div className='col s8 offset-s2'>
                    <h5 className='center-align lobbyHeaders'>Top 10 Leaderboard</h5>
                    <table className='highlight bordered centered tableMargin'>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Game Type</th>
                                <th>Low Score</th>
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