import React from "react";
import { InputData } from "../models/EmailTemplateModel";

interface IProps {
  handleSubmit: (item: InputData) => void;
}

interface IState {
  item: InputData;
}

export default class SideBarComponent extends React.Component<IProps, IState> {
  
  constructor(props: Readonly<IProps>) {
    super(props);

    this.state = {
      item: {
        title: undefined,
      },
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value, name },
    } = e;
    const { item } = this.state;

    this.setState({ item: { ...item, [name]: value } });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { item } = this.state;

    this.props.handleSubmit(item);
  };

  render() {
    return (
      <React.Fragment>
        <div className="lgMenu enter">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Title</label>
              <input
                className="form-control"
                name="title"
                onChange={this.handleChange}
                placeholder="Enter title"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block">
              CREATE
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
