import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { VisualisationPage } from './pages/VisualisationPage/VisualisationPage';
import { CommunicationPage } from './pages/CommunicationPage/CommunicationPage';
import { WarehousePageTest } from './pages/WarehousePage/TableTest/WarehousePage';
import { WarehousePage } from './pages/WarehousePage/WarehousePage';
import { Navigation } from './features/navigation/Navigation';
import { Footer } from './features/footer/Footer';

export function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={VisualisationPage} />
          <Route exact path="/communication" component={CommunicationPage} />
          <Route exact path="/warehouse" component={WarehousePage} />
          <Route exact path="/warehouse-test" component={WarehousePageTest} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;