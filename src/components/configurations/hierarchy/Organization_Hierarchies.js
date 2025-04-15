import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import styled from "styled-components";

const Organization_Hierarchies = () => {
  const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
  `;
  return (
    <>
      <div className="wrapper">
        <Tree
          lineWidth={"2px"}
          lineColor={"green"}
          lineBorderRadius={"10px"}
          label={<StyledNode>Root</StyledNode>}
        >
          <TreeNode label={<StyledNode>Child 1</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
          </TreeNode>
          <TreeNode label={<StyledNode>Child 2</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child</StyledNode>}>
              <TreeNode label={<StyledNode>Great Grand Child 1</StyledNode>} />
              <TreeNode label={<StyledNode>Great Grand Child 2</StyledNode>} />
            </TreeNode>
          </TreeNode>
          <TreeNode label={<StyledNode>Child 3</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
            <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
          </TreeNode>
          <TreeNode label={<StyledNode>Child 4</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
            <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
          </TreeNode>
          <TreeNode label={<StyledNode>Child 5</StyledNode>}>
            <TreeNode label={<StyledNode>Grand Child 1</StyledNode>} />
            <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
          </TreeNode>
        </Tree>
      </div>
    </>
  );
};

export default Organization_Hierarchies;
