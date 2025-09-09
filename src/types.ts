export interface Env {
  ENVIRONMENT?: string;
}

export interface ElectricityEmissionArgs {
  killo_watt_hours: number;
  state: string;
}

export interface GasEmissionArgs {
  giga_joules: number;
  gas_type: string;
}

export interface MCPResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export interface JSONRPCRequest {
  jsonrpc: string;
  method: string;
  params: any;
  id: number | string;
}

export interface JSONRPCResponse {
  jsonrpc: string;
  id: number | string;
  result?: any;
  error?: {
    code: number;
    message: string;
  };
}

export type AustralianState = 
  | 'New South Wales & ACT'
  | 'Victoria' 
  | 'Queensland'
  | 'South Australia'
  | 'Western Australia - SWIS'
  | 'Western Australia - NWIS'
  | 'Tasmania'
  | 'Northern Territory - DKIS';

export type GasState = 
  | 'New South Wales & ACT'
  | 'Victoria'
  | 'Queensland' 
  | 'South Australia'
  | 'Western Australia'
  | 'Tasmania'
  | 'Northern Territory';