import React from 'react'


const Meta = ({ title, description, keywords}) => {
  return (
    <>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
    </>
  )
};

Meta.defaultProps = {
    title: 'Welcome to Heehee~',
    description: 'We provides services and products with the best we can.',
    keywords: 'SEO',
}

export default Meta