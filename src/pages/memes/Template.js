/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TemplatesTableWrapper from '../../components/TemplatesTableWrapper';
import useFetchGet from '../../hooks/useFetchGet';

export default function Template(props) {
  const { handleToast } = props;

  const [templates, setTemplates] = useState([]);
  const TEMPLATE_API_URL = 'https://octameme-api.glitch.me/templates';

  const [getTemplateError, getTemplateLoading, getTemplateData] =
    useFetchGet(TEMPLATE_API_URL);

  useEffect(() => {
    if (!getTemplateError && !getTemplateLoading) {
      setTemplates(getTemplateData);
    }

    if (getTemplateError) {
      handleToast(
        `Failed to fetch templates! Info: "${getTemplateError}"`,
        'error'
      );
    }
  }, [getTemplateError, getTemplateLoading, getTemplateData]);

  return (
    <>
      <div className="px-0 py-5">
        <h1>Meme Templates</h1>
        <Link to="/templates/add" className="btn btn-sm btn-outline-primary">
          <i className="fa-solid fa-plus" />
          <span className="ms-2">Add New</span>
        </Link>
      </div>
      <div>
        <TemplatesTableWrapper
          templates={templates}
          getTemplateLoading={getTemplateLoading}
          handleFetchDelete={null}
        />
      </div>
    </>
  );
}
