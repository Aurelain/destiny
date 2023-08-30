import React from 'react';

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
                <div>{this.state.response}</div>
            </div>
        );
    }

    componentDidMount() {
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
}

// =====================================================================================================================
//  E X P O R T
// =====================================================================================================================
export default App;
