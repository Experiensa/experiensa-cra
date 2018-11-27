import React from 'react';

import { Row, Col, Card, Tree } from 'antd';
import 'antd/dist/antd.css';

const { TreeNode } = Tree;

const renderAsTree = (res, key = '0') => {
  if (!res) return null;
  const iterable = Array.isArray(res) ? res : Object.keys(res);
  return iterable.map((item, index) => {
    const type = typeof res[item];
    if (type === 'string' || type === 'number') {
      return (
        <TreeNode
          title={
            <div>
              <span>{item}:</span>&nbsp;
                <span dangerouslySetInnerHTML={{ __html: res[item] }} />
              </div>
            }
            key={key + "-" + (index + 1)}
            />
        );
      }
      const hasObject = (res[item] === undefined && typeof item !== 'string');
      const node = hasObject ? item : res[item];
      return (
        <TreeNode title={typeof item !== 'string' ? 'Object' : '' + (node || Array.isArray(res) ? item : item + ': null')} key={key + "-" + (index + 1)}>
          {renderAsTree(node, key + "-" + (index + 1))}
        </TreeNode>
      );
    });
  };

  function onData(res) {
    return (
      <div className="list-item" key={res._id}>
        <ExpandCollapse previewHeight="390px" expandText="Show more">
          {
            <Tree showLine>{renderAsTree(res)}</Tree>
          }
        </ExpandCollapse>
      </div>
    );
  };

  const Card = () => (
    <ReactiveBase app="experiensa" credentials="UTErssscR:66ca48ad-793d-4e7a-9bbc-4f9429cb2e94" url="https://scalr.api.appbase.io" analytics>
      <Row gutter={16} style={{ padding: 20 }}>
        <Col span={6}>
          <Card>
            <MultiList componentId="list-1" dataField="website_name.keyword" style={{ marginBottom: 20 }}/>
            <MultiList componentId="list-3" dataField="theme.array.keyword" style={{ marginBottom: 20 }} />
          </Card>
        </Col>
        <Col span={18}>
          <DataSearch componentId="search"
            dataField={[ 'genres', 'genres.autosuggest', 'genres.keyword', 'genres.search']}
            fieldWeights={[1,1,1,1]} highlightField={['genres']} style={{ marginBottom: 20 }}/>
          <SelectedFilters />
          <ReactiveList
            componentId="result"
            dataField="genres.keyword"
            onData={onData}
            pagination={true}
            react={{and: ['list-1','list-3','search']}}
            size={5}
            style={{ marginTop: 20 }}
            />
        </Col>
      </Row>
    </ReactiveBase>
  );

  export default Card;
