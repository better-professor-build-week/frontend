import React, { Component } from "react";
import { Link } from "react-router-dom";
import MultiSelect from "@khanacademy/react-multi-select";

class SendNewMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            send_date: new Date(),
            selected: []
        };
    }

    sendMessage = event => {
        event.preventDefault();
        const newMessage = {
            message: this.state.message,
            send_date: this.state.send_date,
            to: this.state.selected
        };

        this.props.sendMessage(newMessage);

        this.setState({
            message: "",
            send_date: new Date()
        });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { selected } = this.state;
        const options = this.props.students.map(student => ({
            label: `${student.firstname} ${student.lastname}`,
            value: student.student_id
        }));

        return (
            <div className="MessageForm">
                <form onSubmit={this.sendMessage}>
                    <MultiSelect
                        overrideStrings={{
                            selectSomeItems: "Select student",
                            allItemsAreSelected: "All students are selected"
                        }}
                        options={options}
                        selected={selected}
                        onSelectedChanged={selected =>
                            this.setState({ selected })
                        }
                    />
                    <input
                        className="Input"
                        onChange={this.handleInputChange}
                        placeholder="Message"
                        value={this.state.message}
                        name="message"
                        type="text"
                    />

                    <input
                        className="Input"
                        onChange={this.handleInputChange}
                        placeholder="Date"
                        value={this.state.send_date}
                        name="send_date"
                        type="datetime-local"
                    />

                    <button type="submit">Send</button>
                    {/* <Link to='/'className='ilink'>Go to Village</Link> */}
                </form>
            </div>
        );
    }
}

export default SendNewMessage;
