import React, { useCallback, useRef, useState, useEffect, useMemo , memo} from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle, Position, NodeResizer,
  // getIncomers,
  // getOutgoers,
  // getConnectedEdges,
} from 'reactflow';
// import TextUpdaterNode from '/Users/LENOVO/Desktop/DS/react flow/mind-map/src/TextUpdaterNode';

import 'reactflow/dist/style.css';

const initialNodes = [];
const initialEdges = [];

let id = 1;
export default function App({ headers }) {

  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [newNodeLabel, setNewNodeLabel] = useState('');

  // const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
 
  const updateNodesAndEdges = useCallback(() => {
    let updatedNodes = [...nodes];

    for (let i = 0; i < headers.length; i++) {
      const node = {
        id: (id++).toString(),
        type: 'default',
        position: { x: 500, y: i * 50 },
        data: { label: headers[i] },
        info: "header node",
      };

      updatedNodes.push(node);
    }

    setNodes(updatedNodes);
  }, [headers, nodes, edges, setNodes, setEdges]);

  useEffect(() => {
    updateNodesAndEdges();
  }, []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges) );     },
        [nodes, edges]
      );

  const handleAddNode = () => {
    const newNode = {
      id: (id++).toString(),
      type: 'default',
      position: { x: 0, y: 100 },
      data: { label: newNodeLabel },
      info: "custom node",
    };

    setNodes([...nodes, newNode]);
  };

  const handleLabelChange = (e) => {
    setNewNodeLabel(e.target.value);
  };

 
  const download = () => {
    console.log(nodes,edges)
    try {
      if (!nodes || !edges) {
        throw new Error('Invalid nodes or edges arrays.');
      }
  
      let nodeArray = [];
      let edgesArray = [];
  
      for (let i = 0; i < nodes.length; i++) {
        const nodeItem = {
          id: nodes[i]?.id,
          nodeName: nodes[i]?.data?.label,
          nodeType: nodes[i]?.info
        };
  
        const edgeItem = {
          source: edges[i]?.source,
          target: edges[i]?.target
        };
  
        nodeArray.push(nodeItem);
        edgesArray.push(edgeItem);
      }
  
      // console.log('Download successful:', { nodeArray, edgesArray });
      const jsonString = JSON.stringify(nodeArray, null, 2);
      const jsonString2 = JSON.stringify(edgesArray, null, 2);

      const blob = new Blob([jsonString], { type: 'application/json' });
      const blob2 = new Blob([jsonString2], { type: 'application/json' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'nodeArray.json';
      link.click();
      const link2 = document.createElement('a');
      link.href = URL.createObjectURL(blob2);
      link.download = 'edgesArray.json';
      link.click();
    } catch (error) {
      console.error('Error during download:', error.message);
      // You can handle the error further or log it as needed
    }
  };
  


  return (
    <>
      <div className="addnode">
        <input
          type="text"
          placeholder="Node Label"
          value={newNodeLabel}
          onChange={handleLabelChange}
          className='inputlabel'
        />
        <button onClick={handleAddNode} className='inputbox'>Add Node</button>
      </div>

      {/* <div>
  {(nodes || []).map((ele, index) => (
    <div key={index} className="json">{ele.data.label || ''}</div>
  ))}
</div> */}


      <div className="mindmap" style={{ width: '1200px', height: '450px' }}>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          onConnect={onConnect}
          // nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap  nodeColor="black" maskStrokeColor="black"/>
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <div class="input">
          <h2>Step 3</h2>
          <button onClick={download}>Download JSON</button>
        </div>
    </>
  );
}
