"use client"

import React from "react"
import { dock as docks } from "@/data/dock"

export const LinkDock = () => {

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="rounded-full p-[2px] bg-[linear-gradient(to_right,#FF00FF,rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),rgba(0,0,0,0),#10b981,#FF00FF)] animate-shimmer">
                <div className="rounded-full bg-white dark:bg-black  flex items-center space-x-6 px-4 py-3 shadow-lg">
                    {
                        docks.map((dock) => (
                            <a  key={dock.link}
                                href={dock.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center text-2xl hover:text-primary transition-colors">
                                <span className={dock.icon} />
                            </a>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}