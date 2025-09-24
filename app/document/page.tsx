"use client"
import { useState } from "react"
import DocumentSourceManager from "../../document-source-manager"
import UrlListManager from "../../url-list-manager"

export default function Page() {
  const [activeMenu, setActiveMenu] = useState("document")

  const renderContent = () => {
    switch (activeMenu) {
      case "document":
        return <DocumentSourceManager onMenuChange={setActiveMenu} />
      case "urllist":
        return <UrlListManager onMenuChange={setActiveMenu} />
      default:
        return <DocumentSourceManager onMenuChange={setActiveMenu} />
    }
  }

  return renderContent()
}
