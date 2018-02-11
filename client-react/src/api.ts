const baseUrl = '../api';
import fetch from './fetch';

export async function getIdentity(): Promise<any> {
  return await fetchData('identity');
}

export async function getMessages(): Promise<any> {
  return await fetchData('messages');
}

export async function getMessage(orderId: string): Promise<any> {
  return await fetchData(`messages/${orderId}`);
}

async function fetchData(apiPath: string): Promise<any> {
  const result = await fetch(`${baseUrl}/${apiPath}`);
  return await result.json();
}