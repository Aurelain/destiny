import React from 'react';
import getList from '../system/getList.js';

// =====================================================================================================================
//  D E C L A R A T I O N S
// =====================================================================================================================

// =====================================================================================================================
//  C O M P O N E N T
// =====================================================================================================================
class App extends React.PureComponent {
    state = {
        response: 'nothing',
    };
    render() {
        return (
            <div>
                <button onClick={this.onSendClick}>Send</button>
                <button onClick={this.onFetchClick}>Fetch</button>
                <div>{this.state.response}</div>
            </div>
        );
    }

    async componentDidMount() {
        const list = await getList();
        console.log('list:', list);
        //listen to messages
        navigator.serviceWorker.onmessage = (event) => {
            if (event.data && event.data.type === 'DESTINY') {
                console.log('Client received:', event.data.payload);
                this.setState({
                    response: event.data.payload,
                });
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------------------
    // P R I V A T E
    // -----------------------------------------------------------------------------------------------------------------
    /**
     *
     */
    onSendClick = async () => {
        const data = {
            type: 'DESTINY',
            payload: Math.random(),
        };
        console.log('Client will send:', data.payload);
        navigator.serviceWorker.controller.postMessage(data);
    };

    /**
     *
     */
    onFetchClick = async () => {
        const response = await fetch('foo');
        console.log('response:', response.text());
    };
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
