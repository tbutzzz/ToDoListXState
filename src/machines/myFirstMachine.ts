import { createMachine } from "xstate";

export const myMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYgFkB5AVQGUBRDgDU+AJQDaABgC6iUAAdysXJVzl8skAA9EARgAcANhIBmCcYAsEgKxWA7ACYJATh32DAGhABPXaZLnje3s9K31bYyt7HQMAXxjPNCw8QlJseiZWTl4BLgAVSRkkEAUlFTUNbQQdJ3MSKwMJWz1jfQsm+3NPHwQ9HRJ9fStzQdsDJ2s4+JAKCDgNRJwCYg0S5VV1IsqAWg9vRC2rEidjk9PT4ziEjEWUsipaBmYIFcU18s3Ec3suxEMSA3M5isx0cDlstnMekuIAWyWIJDSj0gL1K6wqiAsxhIeicOJ0ElcoL0tisPx6Tn6gOBTlB9nBkMmMSAA */
    initial: 'notHovered',
    states: {
        notHovered: {
            on: {
                MOUSEOVER: {
                    target: 'hovered',
                }
            }
        },
        hovered: {
            on: {
                MOUSEOUT: {
                    target: 'notHovered'
                }
            }
        },
    },
});