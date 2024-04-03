'use client'
import { useState } from 'react';
import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

export default function Home() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { title, body };

    fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // 데이터를 성공적으로 보낸 후에 상태를 초기화할 수 있습니다.
      setTitle('');
      setBody('');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="text"
          />
        </p>
        <p>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="body"
          ></textarea>
        </p>
        <input type="submit" value="submit" />
      </form>
      <p>
        <Link href="/imageread">
          <input type="button" value="go to imageread" className={clsx('weight')} />
        </Link>
      </p>
      <p>
        <Link href="/upload">
          <input type="button" value="go to upload" />
        </Link>
      </p>
    </>
  );
}
