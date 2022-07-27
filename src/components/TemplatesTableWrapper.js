/* eslint-disable react/prop-types */
import React from 'react';
import TemplateItem from './TemplateItem';

export default function TemplatesTableWrapper(props) {
  const { templates, getTemplateLoading, handleFetchDelete } = props;

  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Template Image</th>
          <th scope="col">Example Image</th>
          <th scope="col">Created At</th>
          <th scope="col">Created By</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {templates.map((template, index) => (
          <TemplateItem
            template={template}
            index={index}
            handleFetchDelete={handleFetchDelete}
          />
        ))}
        {getTemplateLoading ? (
          <tr>
            <td colSpan="8">
              <i>Loading...</i>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
