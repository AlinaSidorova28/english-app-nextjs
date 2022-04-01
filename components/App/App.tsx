// import './App.module.scss';
//
// import * as React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';
//
// import { Routes } from '../../constants/routes';
// import { SectionHome } from '../SectionHome/SectionHome';
// import { SectionNotFound } from '../SectionNotFound/SectionNotFound';
// import { SectionServerError } from '../SectionServerError/SectionServerError';
// import { SectionUnauthorized } from '../SectionUnauthorized/SectionUnauthorized';
// import { SectionWelcome } from '../SectionWelcome/SectionWelcome';
//
// type RoutesToComponentsStack = {
//     [key in Routes]?: React.ComponentType<{ className?: string }>;
// };
//
// const ROUTES: RoutesToComponentsStack = {
//     [Routes.HOME]: SectionHome,
//     [Routes.WELCOME]: SectionWelcome,
//     [Routes.NOT_FOUND]: SectionNotFound,
//     [Routes.SERVER_ERROR]: SectionServerError,
//     [Routes.UNAUTHORIZED]: SectionUnauthorized,
// };
//
function App() {
//     // const route = useSelector<StateSchema, Routes>(getEventRoute);
//     const route = Routes.HOME;
//     const SectionContent = ROUTES[route] || SectionNotFound;
//     // const SectionContent = SectionNotFound;
//
//     return (
//         <BrowserRouter>
//             <div className="App">
//                 <div className={'content'}>
//                     {/*<PageHeader className={'header'}/>*/}
//                     {Object.entries(ROUTES).map((el) => {
//                         return <Route path={`/${el[0]}`} component={el[1]} key={el[0]}/>;
//                     })}
//                     <Route exact path="/" component={SectionHome} />
//                     {/*<SectionContent className={'section'} />*/}
//                     {/*<PageFooter className={'footer'} />*/}
//                 </div>
//             </div>
//         </BrowserRouter>
//     );
}

export default App;
