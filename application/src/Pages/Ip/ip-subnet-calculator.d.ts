declare module 'ip-subnet-calculator' {
  export function calculateCIDRPrefix(subnetMask: string): number;
  export function calculateNetworkRange(ip: string, cidr: number): {
    networkAddress: string;
    firstAddress: string;
    lastAddress: string;
    broadcastAddress: string;
  };
}
