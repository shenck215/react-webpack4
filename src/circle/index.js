import styles from "./style";

export default class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "rgb(0,0,0)"
    };
  }

  changeColor = () => {
    this.setState({
      color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`
    });
  };

  render() {
    const { color } = this.state;
    return (
      <div
        onClick={this.changeColor}
        className={styles.wrapper}
        style={{ backgroundColor: color }}
      />
    );
  }
}
