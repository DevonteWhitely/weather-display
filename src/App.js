import React from 'react';
import Header from './components/Header';
import WeatherDisplay from './components/WeatherDisplay';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WeatherDisplay />
      </div>
    );
  }
}

export default App;
