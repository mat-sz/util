import React, { useState } from 'react';

import { Grid } from '../../../components/Grid/index.js';
import { Col } from '../../../components/Col/index.js';
import { Label } from '../../../components/Label/index.js';
import { Select } from '../../../components/Select/index.js';
import { Input } from '../../../components/Input/index.js';
import { Section } from '../../../components/Section/index.js';
import { aton4, aton6, ntoa4, ntoa6 } from '../../../helpers/ip.js';

const subnets = {
  '32': '255.255.255.255/32',
  '31': '255.255.255.254/31',
  '30': '255.255.255.252/30',
  '29': '255.255.255.248/29',
  '28': '255.255.255.240/28',
  '27': '255.255.255.224/27',
  '26': '255.255.255.192/26',
  '25': '255.255.255.128/25',
  '24': '255.255.255.0/24',
  '23': '255.255.254.0/23',
  '22': '255.255.252.0/22',
  '21': '255.255.248.0/21',
  '20': '255.255.240.0/20',
  '19': '255.255.224.0/19',
  '18': '255.255.192.0/18',
  '17': '255.255.128.0/17',
  '16': '255.255.0.0/16',
  '15': '255.254.0.0/15',
  '14': '255.252.0.0/14',
  '13': '255.248.0.0/13',
  '12': '255.240.0.0/12',
  '11': '255.224.0.0/11',
  '10': '255.192.0.0/10',
  '9': '255.128.0.0/9',
  '8': '255.0.0.0/8',
  '7': '254.0.0.0/7',
  '6': '252.0.0.0/6',
  '5': '248.0.0.0/5',
  '4': '240.0.0.0/4',
  '3': '224.0.0.0/3',
  '2': '192.0.0.0/2',
  '1': '128.0.0.0/1',
};

export const Component: React.FC = () => {
  const [prefix4, setPrefix4] = useState('30');
  const [address4, setAddress4] = useState('1.1.1.1');
  const [prefix6, setPrefix6] = useState('48');
  const [address6, setAddress6] = useState(
    '2001:db8:3333:4444:5555:6666:7777:8888',
  );

  const int4 = aton4(address4);
  const valid4 = typeof int4 === 'number';

  const cidr4 = parseInt(prefix4);
  const diff4 = 32 - cidr4;
  const numberOfHosts = Math.pow(2, diff4);
  const maskInt4 = ((Math.pow(2, 32) - 1) << diff4) >>> 0;
  const netInt4 = valid4 ? int4 & maskInt4 : undefined;
  const broadcastInt4 = valid4 ? int4 | diff4 : undefined;

  const firstOctet = valid4 ? (int4 >> 24) & 255 : undefined;
  const secondOctet = valid4 ? (int4 >> 16) & 255 : undefined;
  const class4 = firstOctet
    ? firstOctet < 128
      ? 'A'
      : firstOctet < 192
      ? 'B'
      : firstOctet < 224
      ? 'C'
      : firstOctet < 240
      ? 'D'
      : 'E'
    : undefined;
  const isPrivate4 =
    firstOctet === 10 ||
    (firstOctet === 172 &&
      secondOctet &&
      secondOctet >= 16 &&
      secondOctet <= 32) ||
    (firstOctet === 192 && secondOctet === 168);
  const isLoopback4 = firstOctet === 127;
  const type4 = isLoopback4 ? 'Loopback' : isPrivate4 ? 'Private' : 'Public';
  const twoHex4 = valid4
    ? `${(int4 >> 16).toString(16)}.${(int4 & 65535).toString(16)}`
    : undefined;

  const int6 = aton6(address6);
  const valid6 = typeof int6 === 'bigint';
  const intPrefix6 = parseInt(prefix6);
  const diff6 = 128 - intPrefix6;
  const addresses6 = Math.pow(2, diff6);
  const networks6 = intPrefix6 > 64 ? 0 : Math.pow(2, 64 - intPrefix6);
  const maskInt6 = (BigInt(Math.pow(2, 128)) - BigInt(1)) << BigInt(diff6);
  const netInt6 = valid6 ? int6 & maskInt6 : undefined;

  return (
    <Grid m={2} flex>
      <Col>
        <Section title="IPv4">
          <Label title="Subnet:" />
          <Select value={prefix4} onChange={setPrefix4}>
            {Object.entries(subnets).map(([prefix, mask]) => (
              <option key={prefix} value={prefix}>
                {mask}
              </option>
            ))}
          </Select>
          <Label title="Address:" />
          <Input value={address4} onChange={setAddress4} maxLength={15} />
        </Section>
        <Section title="Result">
          <Label title="Network address:" />
          <Input value={ntoa4(netInt4)} readOnly />
          <Label title="Usable host range:" />
          <Input
            value={
              netInt4 && numberOfHosts > 2
                ? `${ntoa4(netInt4 + 1)} - ${ntoa4(
                    netInt4 + numberOfHosts - 2,
                  )}`
                : undefined
            }
            readOnly
          />
          <Label title="Broadcast address:" />
          <Input value={ntoa4(broadcastInt4)} readOnly />
          <Label title="Number of hosts:" />
          <Input value={numberOfHosts.toLocaleString()} readOnly />
          <Label title="Number of usable hosts:" />
          <Input
            value={Math.max(numberOfHosts - 2, 0).toLocaleString()}
            readOnly
          />
          <Label title="Wildcard mask:" />
          <Input value={ntoa4(~maskInt4)} readOnly />
          <Label title="Type:" />
          <Input value={type4} readOnly />
          <Label title="Class:" />
          <Input value={class4} readOnly />
          <Label title="Mask (bin):" />
          <Input value={maskInt4?.toString(2).padStart(32, '0')} readOnly />
          <Label title="Address (bin):" />
          <Input value={int4?.toString(2).padStart(32, '0')} readOnly />
          <Label title="Address (dec):" />
          <Input value={int4} readOnly />
          <Label title="Address (hex):" />
          <Input value={int4?.toString(16).padStart(8, '0')} readOnly />
          <Label title="in-addr.arpa:" />
          <Input
            value={
              valid4
                ? address4.split('.').reverse().join('.') + '.in-addr.arpa'
                : ''
            }
            readOnly
          />
          <Label title="IPv4 mapped address:" />
          <Input value={twoHex4 ? `::ffff:${twoHex4}` : ''} readOnly />
          <Label title="6to4 prefix:" />
          <Input value={twoHex4 ? `2002:${twoHex4}/48` : ''} readOnly />
        </Section>
      </Col>
      <Col>
        <Section title="IPv6">
          <Label title="Prefix:" />
          <Input
            type="number"
            value={prefix6}
            onChange={setPrefix6}
            min={1}
            max={128}
            step={1}
          />
          <Label title="Address:" />
          <Input value={address6} onChange={setAddress6} maxLength={39} />
        </Section>
        <Section title="Result">
          <Label title="Address (dec):" />
          <Input value={int6?.toString()} readOnly />
          <Label title="Full address:" />
          <Input value={ntoa6(int6, true)} readOnly />
          <Label title="Short address:" />
          <Input value={ntoa6(int6, false)} readOnly />
          <Label title="Network:" />
          <Input value={ntoa6(netInt6, false)} readOnly />
          <Label title="Total addresses:" />
          <Input
            value={valid6 ? addresses6.toLocaleString() : undefined}
            readOnly
          />
          <Label title="Total /64 networks:" />
          <Input
            value={valid6 ? networks6.toLocaleString() : undefined}
            readOnly
          />
        </Section>
      </Col>
    </Grid>
  );
};

export default Component;
