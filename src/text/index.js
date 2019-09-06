import styles from 'src/text/style'
import timg from '../../images/ttt'

export default class Circle extends React.Component {
  
  state = {
    count: 0
  };

  add = () => {
    const { count } = this.state;
    this.setState({
      count: count + 1,
    });
  };

  sub = () => {
    const { count } = this.state;
    this.setState({
      count: count - 1,
    });
  };

  render() {
    const { count } = this.state;
    return (
      <div className={styles.wrapper}>
        <div className={styles.font}>{count}</div>
        <button onClick={this.add}>+</button>
        <button onClick={this.sub}>-</button>
        <img src={timg} />
      </div>
    );
  }
}