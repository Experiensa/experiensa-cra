import React from 'react';

import { ReactiveBase, DataSearch, MultiList, SelectedFilters,
  //ReactiveList,
  RangeSlider,
  ResultCard
} from '@appbaseio/reactivesearch';
import moment from 'moment';
import 'moment/locale/fr';
import { Row, Col,
  //Card,
  Collapse
  //Tree,
  //List,
  //Icon
} from 'antd';


import 'antd/dist/antd.css';

//import ExpandCollapse from 'react-expand-collapse';

import './styles.css';

//const { Meta } = Card;
//const { TreeNode } = Tree;

// const renderAsTree = (res, key = '0') => {
//   if (!res) return null;
//   console.log(res);
//   const iterable = Array.isArray(res) ? res : Object.keys(res);
//   return iterable.map((item, index) => {
//     const type = typeof res[item];
//     if (type === 'string' || type === 'number') {
//       return (
//         <TreeNode
//           title={
//             <div>
//               <span>{item}:</span>&nbsp;
//                 <span dangerouslySetInnerHTML={{ __html: res[item] }} />
//               </div>
//             }
//             key={key + "-" + (index + 1)}
//             />
//         );
//       }
//       const hasObject = (res[item] === undefined && typeof item !== 'string');
//       const node = hasObject ? item : res[item];
//       return (
//         <TreeNode title={typeof item !== 'string' ? 'Object' : '' + (node || Array.isArray(res) ? item : item + ': null')} key={key + "-" + (index + 1)}>
//           {renderAsTree(node, key + "-" + (index + 1))}
//         </TreeNode>
//       );
//     });
//   };

const Panel = Collapse.Panel;

// function onData(res) {
//   return (
//     <div className="list-item" key={res._id}>
//       <ExpandCollapse previewHeight="390px" expandText="Show more">
//         {
//           <Tree showLine>{renderAsTree(res)}</Tree>
//         }
//       </ExpandCollapse>
//     </div>
//   );
// };



class Catalog extends React.Component {


  myList(res){
    if (!res) return null;

    var price = res.price;
    var formattedPrice = Number(price).toLocaleString("de-CH", {style: "currency", currency: "CHF", minimumFractionDigits:0});

    moment.locale('fr');
    var date_from = moment(res.start_date).format('ll');
    var date_to = moment(res.end_date).format('ll');
    let countries = res.countries;

    if (countries == null) {
      countries = "";
    } else {
      countries.toString();
    }

    let slogan = res.slogan;
    if (res.slogan == null) {
      slogan = "";
    }else{
      slogan = slogan.toLowerCase();
    }

    console.log(slogan);

    console.log(countries);

    return {
      image: res.thumbnail,
      title: (<h3 className="tc f3 lh-title avenir">{res.title}</h3>),
      description: (
        <div className="tc">
          <span className="slogan">{slogan}</span>
          <br/>
          <br/>
          <p>{date_from} - {date_to}</p>
          <p>{res.number_of_days} jours/{res.number_of_nights} nuits</p>
          <span className="card_price">{formattedPrice}</span>
        </div>
      ),
      url: res.link,
    }
  };

  render() {
    return (
      <ReactiveBase app="expch" credentials="qQXEi6aBt:60a7f2e1-ad20-4e80-95d4-879e23804e49" url="https://scalr.api.appbase.io" analytics>
        <Row gutter={16} style={{ padding: 0 }}>
          <Col xs={24} sm={24} md={5} lg={6} xl={6}>
            <Collapse bordered={false} defaultActiveKey={['1']}>
              <Panel header="Regions du monde" key="1">
                <MultiList componentId="list-region" dataField="region.keyword" style={{marginBottom: 20}} placeholder="Rechercher une region du monde"/>
              </Panel>
              <Panel header="Pays" key="2">
                <MultiList componentId="list-country" dataField="countries.keyword" style={{ marginBottom: 20 }} placeholder="Rechercher un pays"/>
              </Panel>
              <Panel header="Themes" key="3">
                <MultiList componentId="list-theme" dataField="themes.keyword" style={{ marginBottom: 20 }} placeholder="Rechercher un thème"/>
              </Panel>
              <Panel header="Tour operateurs" key="4">
                <MultiList componentId="list-operator" dataField="operator.keyword" style={{ marginBottom: 20 }}/>
              </Panel>
              <Panel header="Prix" key="5">
                <RangeSlider
                  componentId="PriceSensor"
                  dataField="price"
                  title="Price Range"
                  range={{ start: 50, end: 5000 }}
                  rangeLabels={{start: "CHF 50",end: "CHF 5000"}}
                  defaultSelected={{start: 50, end: 4500}}
                  stepValue={10}
                  />
              </Panel>
            </Collapse>
            <br/>
          </Col>
          <Col xs={24} sm={24} md={19} lg={18} xl={18}>
            <DataSearch
              componentId="search"
              dataField={['title','tags','locations', 'country']}
              fieldWeights={[1,1,1]}
              highlightField={['genres']}
              style={{ marginBottom: 15 }}
              placeholder="Recherche"
              />
            <SelectedFilters />

            <ResultCard
              componentId="ResultCard"
              dataField="title"
              pagination={true}
              pages={5}
              size={20}
              loader="Chargement des résultats..."
              react={{and: ['list-region','list-country','list-theme','list-operator','PriceSensor','search']}}
              onData={this.myList}
              className={'voyage-card'}
              onNoResults="Nous n'avons trouvé aucun résultat"
              />
          </Col>
        </Row>
      </ReactiveBase>
    );
  }
}

// <ReactiveList
//   componentId="result"
//   dataField="genres.keyword"
//   onData={myList}
//   pagination={true}
//   react={{and: ['list-1','list-3','search']}}
//   size={5}
//   style={{ marginTop: 20 }}
//   />
//
// //               <DateRange
//               dataField="date_from"
//               componentId="DateRangeSensor"
//               title="Periode"
//               numberOfMonths={1}
//               queryFormat="date"
//               />
export default Catalog;
