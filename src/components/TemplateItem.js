/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

export default function TemplateItem(props) {
  const { template, index, handleFetchDelete } = props;
  const createdAtFormatted = moment(template.createdAt).format('LLLL');

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{template.title}</td>
      <td>{template.description}</td>
      <td>
        <a href={template.templateImageUrl} target="_blank" rel="noreferrer">
          <img
            src={template.templateImageUrl}
            height="200"
            alt={template.title}
            style={{ border: '1px solid #555' }}
          />
        </a>
      </td>
      <td>
        <a href={template.exampleImageUrl} target="_blank" rel="noreferrer">
          <img
            src={template.exampleImageUrl}
            height="200"
            alt={template.exampleImageUrl}
            style={{ border: '1px solid #555' }}
          />
        </a>
      </td>
      <td>{createdAtFormatted}</td>
      <td>{template.createdBy}</td>
      <td>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => {
            handleFetchDelete(template);
          }}
        >
          <span className="fa-solid fa-trash" aria-hidden="true" />
        </button>
      </td>
    </tr>
  );
}
