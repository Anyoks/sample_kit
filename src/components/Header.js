import React from "react"
import { Styled, Header } from "theme-ui"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"

const HeaderComponent = ({ lastUpdatedTime }) => {


  return (
    <Header>
      <Helmet title={"title"}>
        <html lang={`en`} />
       
      </Helmet>
    </Header>
  )
}

export default HeaderComponent