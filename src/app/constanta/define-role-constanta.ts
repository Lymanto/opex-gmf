const RoleEmpty = {
  USER: {},
  MANAGER_USER: {},
  SM_USER: {},
  VP_USER: {},
  TAB: {},
  SM_TAB: {},
  TAP: {},
  SM_TAP: {},
  TAM: {},
  SM_TAM: {},
  VP_TA: {},
  TXC_3: {},
  SM_TXC: {},
  VP_TX: {},
  DF: {},
  DT: {},
};

const phase = {
  1: {},
  2: {},
  3: {},
  4: {},
  5: {},
  6: {},
  7: {},
  8: {},
  9: {},
  10: {},
  11: {},
  12: {},
  13: {},
};

export const DataByRole = {
  createRealizationViewed: {
    1: {
      save: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
            },
          },
          statusId: 1,
          statusToId: 2,
          status: 'OPEN',
        },
      },
    },
    2: {
      submit: {
        USER: {
          config: {
            button: {},
          },
          statusId: 2,
          statusToId: 3,
          status: 'OPEN',
        },
        3: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
    },
  },
  needApprovalViewed: {
    1: {
      save: {
        USER: {
          config: {
            button: {
              save: true,
              submit: true,
              edit: true,
              editRealokasi: true,
            },
          },
          statusId: '1',
          statusToId: '2',
          status: 'OPEN',
        },
      },
    },
    2: {
      submit: {
        USER: {
          config: {
            button: {},
          },
          statusId: '2',
          statusToId: '3',
          status: 'OPEN',
        },
        3: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
    },
    3: {
      reject: {
        // OK
        USER: {},
        MANAGER_USER: { status: 'Reject', statusId: '3' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '3',
          statusToId: '1',
        },
      },
      confirm: {
        SM_USER: {
          config: {
            button: {},
          },
          status: 'OPEN',
          statusId: '3',
          statusToId: '4',
        },
        4: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
    },
    4: {
      reject: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: { status: 'Reject', statusId: '4' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '4',
          statusToId: '1',
        },
      },
      confirmTAB: {
        VP_USER: {
          config: {
            button: {},
          },
          status: 'OPEN',
          statusId: '4',
          statusToId: '5',
        },
        5: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
    },
    5: {
      reject: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: { status: 'Reject', statusId: '5' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '5',
          statusToId: '1',
        },
      },
      confirm: {
        VP_USER: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '5',
          statusToId: '6',
        },
        6: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
        },
      },
    },
    6: {
      rejectTAB: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: { status: 'Reject', statusId: '6' },
      },
      rejectTAM: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: { status: 'Reject', statusId: '6' },
      },
      rejectTAP: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: { status: 'Reject', statusId: '6' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '6',
          statusToId: '1',
        },
      },
      confirmSMTAB: {
        SM_TAB: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '6',
          statusToId: '7',
        },
        7: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAP: {
        SM_TAP: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '6',
          statusToId: '7',
        },
        7: {
          as: 'REQUESTER',
          config: {
            button: {
              revise: true,
              confirm: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAM: {
        SM_TAM: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '6',
          statusToId: '7',
        },
        7: {
          as: 'REQUESTER',
          config: {
            button: {
              preview: true,
            },
          },
        },
      },
    },
    7: {
      rejectSMTAB: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: { status: 'Reject', statusId: '7' },
      },
      rejectSMTAM: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: { status: 'Reject', statusId: '7' },
      },
      rejectSMTAP: {
        // OK
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: { status: 'Reject', statusId: '7' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '7',
          statusToId: '1',
        },
      },
      confirmSMTAP: {
        SM_TAP: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '7',
          statusToId: '8',
        },
        8: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAM: {
        SM_TAM: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '7',
          statusToId: '8',
        },
        8: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
      confirmSMTAB: {
        SM_TAB: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '7',
          statusToId: '8',
        },
        8: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              preview: true,
            },
          },
        },
      },
    },
    8: {
      rejectVPTA_TAB: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: { status: 'Reject', statusId: '8' },
      },
      rejectVPTA_TAM: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: { status: 'Reject', statusId: '8' },
      },
      rejectVPTA_TAP: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: { status: 'Reject', statusId: '8' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '8',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '8',
          statusToId: '6',
        },
      },
      confirm: {
        VP_TA: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '8',
          statusToId: '9',
        },
        9: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
              confirm: true,
            },
          },
        },
      },
    },
    9: {
      rejectTXC_TAB: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: { status: 'Reject', statusId: '9' },
      },
      rejectTXC_TAM: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: { status: 'Reject', statusId: '9' },
      },
      rejectTXC_TAP: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: { status: 'Reject', statusId: '9' },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '9',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '9',
          statusToId: '6',
        },
      },
      confirm: {
        TXC_3: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '9',
          statusToId: '10',
        },
        10: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              preview: true,
              approve: true,
            },
          },
        },
      },
    },

    10: {
      rejectSMTXC_TAB: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: { status: 'Reject', statusId: '10' },
      },
      rejectSMTXC_TAM: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: { status: 'Reject', statusId: '10' },
      },
      rejectSMTXC_TAP: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {
          status: 'Reject',
          statusId: '10',
        },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '10',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '10',
          statusToId: '6',
        },
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '10',
          statusToId: '9',
        },
      },
      confirm: {
        SM_TXC: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '10',
          statusToId: '11',
        },
        11: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              preview: true,
              approve: true,
            },
          },
        },
      },
    },
    11: {
      rejectVPTX_TAB: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {
          status: 'Reject',
          statusId: '11',
        },
      },
      rejectVPTX_TAM: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {
          status: 'Reject',
          statusId: '11',
        },
      },
      rejectVPTX_TAP: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {
          status: 'Reject',
          statusId: '11',
        },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '11',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '11',
          statusToId: '6',
        },
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '11',
          statusToId: '9',
        },
      },
      confirmVP_TA: {
        VP_TX: {
          config: {
            button: {},
          },
          status: 'PROGRESS',
          statusId: '11',
          statusToId: '12',
        },
        12: {
          as: 'REQUESTER',
          config: {
            button: {
              reject: true,
              revise: true,
              preview: true,
              approve: true,
            },
          },
        },
        confirmVP_TX: {
          VP_TX: {
            config: {
              button: {},
            },
            status: 'CLOSED',
            statusId: '11',
          },
        },
      },
    },
    12: {
      rejectDF_TAB: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAB: {},
        SM_TAB: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {},
        DF: {
          status: 'Reject',
          statusId: '12',
        },
      },
      rejectDF_TAM: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAM: {},
        SM_TAM: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {},
        DF: {
          status: 'Reject',
          statusId: '12',
        },
      },
      rejectDF_TAP: {
        USER: {},
        MANAGER_USER: {},
        SM_USER: {},
        VP_USER: {},
        TAP: {},
        SM_TAP: {},
        VP_TA: {},
        TXC_3: {},
        SM_TXC: {},
        VP_TX: {},
        DF: {
          status: 'Reject',
          statusId: '12',
        },
      },
      revise: {
        USER: {
          config: {
            button: {
              edit: true,
              editRealokasi: true,
              save: true,
              submit: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '12',
          statusToId: '1',
        },
        TAB: {
          config: {
            button: {
              reject: true,
              revise: true,
              approve: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '12',
          statusToId: '6',
        },
        TXC_3: {
          config: {
            button: {
              reject: true,
              revise: true,
              confirm: true,
              takeProject: true,
              untakeProject: true,
              needHPS: true,
              preview: true,
            },
          },
          status: 'Revise',
          statusId: '12',
          statusToId: '9',
        },
      },
      confirm: {
        DF: {
          config: {
            button: {},
          },
          status: 'CLOSED',
          statusId: '12',
        },
      },
    },
  },
};
