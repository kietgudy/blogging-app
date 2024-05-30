import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostTitle from "./PostTitle";
import PostMeta from "./PostMeta";
import PostImage from "./PostImage";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
      
    }
    &-category {
      margin-bottom: 8px;
    }
   
    &-title {
      margin-bottom: 8px;
    }
  }
`;
const PostNewestItem = ({data}) => {
  if (!data.id) return null;
  return (
    <PostNewestItemStyles>
      <PostImage url={data.image}
          alt="" to='/'></PostImage>
      <div className="post-content">
        <PostCategory type="secondary">{data.category?.name}</PostCategory>
        <PostTitle>{data.title}</PostTitle>
        <PostMeta></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;