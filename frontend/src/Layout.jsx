import React, { useEffect, useState } from 'react'
import { Theme } from '@radix-ui/themes';
import toast, { Toaster } from "react-hot-toast";
import {
    Outlet
  } from "react-router-dom";
function Layout() {


    return (
      <div>
        <Theme>
        <Outlet/>
        <Toaster/>
        </Theme>
      </div>
    )
  }

export default Layout
