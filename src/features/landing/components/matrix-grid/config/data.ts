interface Tool {
  title: string;
  description: string;
  href: string;
  tag?: {
    text: string;
    type: 'new' | 'soon';
  };
  isLarge?: boolean;
}

interface MatrixGridContent {
  header: {
    title: string;
    subtitle: string;
  };
  tools: Tool[];
}

export const matrixGridContent: MatrixGridContent = {
  header: {
    title: "Build secure authentication without dependencies.",
    subtitle: "Because real developers don't need training wheels. Pure Next.js 15 authentication implementations.",
  },
  tools: [
    {
      title: "RollYourOwnAuth",
      description: "Imagine telling others at a party (if only) that you roll your own auth - you'd be the talk of the evening. And just wait until you mention vim and Arch Linux. Instant adonis status.",
      href: "/rollyourownauth",
      tag: { text: "New", type: "new" },
      isLarge: true,
    },
    {
      title: "Session Management",
      description: "Implement secure session handling with SQLite/Postgres. No dependencies needed.",
      href: "/sessions",
    },
    {
      title: "OAuth2 Implementation",
      description: "Build your own OAuth2 flow from scratch. Because you can.",
      href: "/oauth2",
    },
    {
      title: "JWT Tokens",
      description: "Create and validate JWTs without external libraries. Pure crypto.",
      href: "/jwt",
      tag: { text: "Soon", type: "soon" },
    },
    {
      title: "User Management",
      description: "Complete CRUD operations for user administration. Zero dependencies.",
      href: "/user-management",
    },
    {
      title: "Role-Based Access",
      description: "Implement RBAC with protected routes and content. Pure Next.js.",
      href: "/rbac",
    },
    {
      title: "Feature Flags",
      description: "Build a feature flag system from scratch. Because why not?",
      href: "/feature-flags",
    }
  ]
};

