import React, { useMemo, useState } from 'react';
import { IoTime } from 'react-icons/io5/index.js';
import {
  differenceInMonths,
  differenceInYears,
  getDayOfYear,
  getWeek,
  isLeapYear,
} from 'date-fns';

import { Section } from '../../../components/Section/index.js';
import { Row } from '../../../components/Row/index.js';
import { Button } from '../../../components/Button/index.js';
import { Input } from '../../../components/Input/index.js';
import { Label } from '../../../components/Label/index.js';
import { Grid } from '../../../components/Grid/index.js';
import { booleanToString } from '../../../helpers/format.js';
import { Select } from '../../../components/Select/index.js';
import { Col } from '../../../components/Col/index.js';

const relative = new Intl.RelativeTimeFormat();

function relativeDate(date: Date) {
  let difference = (date.getTime() - new Date().getTime()) / 1000;

  if (Math.abs(difference) < 60) {
    return relative.format(difference, 'seconds');
  }

  difference /= 60;
  if (Math.abs(difference) < 60) {
    return relative.format(difference, 'minutes');
  }

  difference /= 60;
  if (Math.abs(difference) < 24) {
    return relative.format(difference, 'hours');
  }

  difference /= 24;
  if (Math.abs(difference) < 30) {
    return relative.format(difference, 'days');
  }

  difference = differenceInMonths(date, new Date());
  if (Math.abs(difference) < 30) {
    return relative.format(difference, 'months');
  }

  difference = differenceInYears(date, new Date());
  return relative.format(difference, 'years');
}

const LDAP_EPOCH = new Date('1601-01-01T00:00:00.000Z').getTime();
const TWITTER_EPOCH = BigInt(new Date('2010-11-04T01:42:54.657Z').getTime());
const DISCORD_EPOCH = BigInt(new Date('2015-01-01T00:00:00.000Z').getTime());
const WEBKIT_EPOCH = new Date('1601-01-01T00:00:00.000Z').getTime();
const COREDATA_EPOCH = new Date('2001-01-01T00:00:00.000Z').getTime();
const HFS_EPOCH = new Date('1904-01-01T00:00:00.000Z').getTime();

const SNOWFLAKE_SHIFT = BigInt(22);

function snowflakeToUnix(str: string, epoch: bigint): number {
  return Number((BigInt(str) >> SNOWFLAKE_SHIFT) + epoch);
}

function unixToSnowflake(timestamp: number, epoch: bigint): string {
  return ((BigInt(timestamp) - epoch) << SNOWFLAKE_SHIFT).toString();
}

const formats: Record<
  string,
  {
    name: string;
    toUnix: (timestamp: string) => number;
    fromUnix: (unix: number) => string;
  }
> = {
  ldap: {
    name: 'LDAP/Win32 FILETIME',
    fromUnix: unix => `${unix - LDAP_EPOCH}000000`,
    toUnix: timestamp =>
      parseInt(timestamp.substring(0, timestamp.length - 6)) + LDAP_EPOCH,
  },
  twitter: {
    name: 'Twitter snowflake',
    fromUnix: unix => unixToSnowflake(unix, TWITTER_EPOCH),
    toUnix: timestamp => snowflakeToUnix(timestamp, TWITTER_EPOCH),
  },
  discord: {
    name: 'Discord snowflake',
    fromUnix: unix => unixToSnowflake(unix, DISCORD_EPOCH),
    toUnix: timestamp => snowflakeToUnix(timestamp, DISCORD_EPOCH),
  },
  webkit: {
    name: 'WebKit timestamp',
    fromUnix: unix => `${unix - WEBKIT_EPOCH}00000`,
    toUnix: timestamp =>
      parseInt(timestamp.substring(0, timestamp.length - 5)) + WEBKIT_EPOCH,
  },
  coredata: {
    name: 'CoreData timestamp (Mac absolute time)',
    fromUnix: unix => `${(unix - COREDATA_EPOCH) / 1000}`,
    toUnix: timestamp => parseInt(timestamp) * 1000 + COREDATA_EPOCH,
  },
  hfs: {
    name: 'HFS+ timestamp',
    fromUnix: unix => `${(unix - HFS_EPOCH) / 1000}`,
    toUnix: timestamp => parseInt(timestamp) * 1000 + HFS_EPOCH,
  },
};

export const Component: React.FC = () => {
  const [timestamp, setTimestamp] = useState('');
  const [format, setFormat] = useState('auto');

  const date = useMemo(() => {
    try {
      let date: Date | undefined = undefined;

      if (formats[format]) {
        date = new Date(formats[format].toUnix(timestamp));
      } else {
        switch (format) {
          case 'auto':
            date = new Date(parseFloat(timestamp) || timestamp);
            break;
          case 'unix_ms':
            date = new Date(parseFloat(timestamp));
            break;
          case 'unix_s':
            date = new Date(parseFloat(timestamp) * 1000);
            break;
        }
      }

      if (!date || isNaN(date.getTime())) {
        return undefined;
      }

      return date;
    } catch {
      return undefined;
    }
  }, [timestamp, format]);

  return (
    <>
      <Section title="Input">
        <Grid m={3}>
          <Col>
            <Row>
              <Select flex value={format} onChange={setFormat}>
                <option value="auto">Auto-detect</option>
                <option value="unix_ms">Unix timestamp (milliseconds)</option>
                <option value="unix_s">Unix timestamp (seconds)</option>
                {Object.entries(formats).map(([key, info]) => (
                  <option value={key} key={key}>
                    {info.name}
                  </option>
                ))}
              </Select>
            </Row>
            <Row>
              <Input value={timestamp} onChange={setTimestamp} flex />
              <Button
                icon={<IoTime />}
                onClick={() => {
                  setTimestamp(new Date().getTime().toString());
                  setFormat('unix_ms');
                }}
              >
                Now
              </Button>
            </Row>
          </Col>
        </Grid>
      </Section>
      <Section title="Output">
        <Grid m={3}>
          <Col>
            <Label title="Locale:" />
            <Input value={date?.toLocaleString()} readOnly />
            <Label title="RFC 822:" />
            <Input value={date?.toUTCString()} readOnly />
            <Label title="ISO 8601:" />
            <Input value={date?.toISOString()} readOnly />
            <Label title="Relative:" />
            <Input value={date ? relativeDate(date) : undefined} readOnly />
            <Label title="Unix timestamp (s):" />
            <Input
              value={date ? Math.round(date.getTime() / 1000) : undefined}
              readOnly
            />
            <Label title="Unix timestamp (ms):" />
            <Input value={date?.getTime()} readOnly />
          </Col>
          <Col>
            <Label title="Day of year:" />
            <Input value={date ? getDayOfYear(date) : undefined} readOnly />
            <Label title="Week of year:" />
            <Input value={date ? getWeek(date) : undefined} readOnly />
            <Label title="Is leap year?" />
            <Input
              value={date ? booleanToString(isLeapYear(date)) : undefined}
              readOnly
            />
          </Col>
          <Col>
            {Object.entries(formats).map(([key, info]) => (
              <React.Fragment key={key}>
                <Label title={`${info.name}:`} />
                <Input
                  value={date ? info.fromUnix(date.getTime()) : undefined}
                  readOnly
                />
              </React.Fragment>
            ))}
          </Col>
        </Grid>
      </Section>
    </>
  );
};

export default Component;
