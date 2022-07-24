import React, { useEffect, useState } from "react"
import AuthService from "@services/authService"
import { Header, Footer } from "@views/components"
import { Loading } from "@views/elements"

interface IAuthProviderProps {
  children: any
  categoryData: any
}

export default function AuthProvider(props: IAuthProviderProps) {
  const [loadedToken, setLoadedToken] = useState(false)

  const authorizationGuest = async () => {
    const guestToken = await AuthService.getGuestToken()
    localStorage.setItem("token", guestToken.value || "")
    setLoadedToken(true)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) setLoadedToken(true)
    else authorizationGuest()
  }, [])

  return (
    <>
      <Header {...props.categoryData} />
      <div className="main-content">
        {loadedToken ? props.children : <Loading />}
      </div>
      <Footer {...props.categoryData} />
    </>
  )
}
