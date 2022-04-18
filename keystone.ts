import { config, createSchema } from "@keystone-next/keystone/schema";
import { createAuth } from "@keystone-next/auth";
import { withItemData, statelessSessions } from "@keystone-next/keystone/session";
import 'dotenv/config';

import { Customer } from "./schemas/Customer";

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/eCamellDB';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 460,
  secret: process.env.SESSION_SECRET
}

const { withAuth } = createAuth({
  listKey: 'Customer',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ["firstName", "email", "password"],
    // TODO: Add initial roles
  }
})

export default withAuth(config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true
    }
  },
  db: {
    adapter: "mongoose",
    url: databaseURL
  },
  lists: createSchema({
    Customer
  }),
  
  ui: {
    // Show the UI to users that has access
    isAccessAllowed: ({ session }) => {
      console.log({session})
      return session?.data
;    }
  },
  
  session: withItemData(statelessSessions(sessionConfig), {
    Customer: "id name email"
  })
}))
